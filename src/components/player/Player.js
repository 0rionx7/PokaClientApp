import { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useGetGameStateQuery } from 'features/gameState/gameStateApi';
import { playerEntry } from 'common/utilities-functions';
import PlayerInfo from 'components/player/PlayerInfo';
import HandCards from 'components/player/HandCards';
// import useSitOutTimer from 'hooks/useSitOutTimer';
import usePlayerClass from 'hooks/usePlayerClass';
import './Player.scss';

const Player = ({ playerState, index }) => {
  const hostPlayerName = useSelector(state => state.account.username);
  const hostPlayerHandCards = useSelector(state => state.gameState.handCards);
  const { gameId } = useParams();
  const { data } = useGetGameStateQuery(gameId);
  // useSitOutTimer(playerState);
  const { className, gridArea, playingIndex } = usePlayerClass(index);
  const hostPlayerState = useMemo(
    () => data?.playersStateList.find(playerEntry(hostPlayerName)),
    [data?.playersStateList, hostPlayerName]
  );

  const isHostPlayer = playerState.playerName === hostPlayerName;
  const playerSubmitted = playerState.submittedHand.length;
  const canSelect = hostPlayerState.selecting;

  const handCards = playerSubmitted
    ? playerState.submittedHand
    : isHostPlayer
    ? hostPlayerHandCards
    : playerState.handCards;

  return (
    <div className={className} style={{ gridArea }}>
      <HandCards
        cards={handCards}
        canBeSelected={!playerSubmitted && isHostPlayer && canSelect}
        bet={playerState.currentBet}
        playingIndex={playingIndex}
        playerClass={className}
      />
      <div className="player-info">
        <PlayerInfo playerState={playerState} />
        <div className="avatar">{playerState.playerName.slice(0, 1)}</div>
      </div>
    </div>
  );
};

export default memo(Player);
