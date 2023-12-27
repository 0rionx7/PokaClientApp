import { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useGetGameStateQuery } from 'features/gameState/gameStateApi';
import { createPalyerClass } from 'lib/createPlayerClass';
import { createChipsStyle } from 'lib/createChipsStyle';
import { playerEntry } from 'common/utilities-functions';
import PlayerInfo from 'components/player/PlayerInfo';
import HandCards from 'components/player/HandCards';
import useSitOutTimer from 'hooks/useSitOutTimer';
import './Player.scss';

const Player = ({ playerState, index, playersCount }) => {
  const hostPlayerName = useSelector(state => state.account.username);
  const hostPlayerHandCards = useSelector(state => state.gameState.handCards);
  const { gameId } = useParams();
  const { data } = useGetGameStateQuery(gameId);
  // useSitOutTimer(playerState);

  const playerClass = createPalyerClass(playersCount, index);
  const style = createChipsStyle(
    playerState.handCards.length,
    playerClass.includes('top'),
    playerClass.includes('left')
  );

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

  const gridArea = 'player-' + (index + 1);
  const className =
    'player p-' +
    (index + 1) +
    (playerSubmitted ? ' submitted' : '') +
    playerClass;

  return (
    <div className={className} style={{ gridArea }}>
      <HandCards
        cards={handCards}
        canBeSelected={!playerSubmitted && isHostPlayer && canSelect}
        bet={playerState.currentBet}
        style={style}
      />
      <div className="player-info">
        <PlayerInfo playerState={playerState} />
        <div className="avatar">{playerState.playerName.slice(0, 1)}</div>
      </div>
    </div>
  );
};

export default memo(Player);
