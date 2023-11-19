import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useGetGameStateQuery } from 'features/gameApi/gameApi';
import PlayerInfo from 'components/player/PlayerInfo';
import HandCards from 'components/player/HandCards';
import useSitOutTimer from 'hooks/useSitOutTimer';
import './Player.scss';
import { playerEntry } from 'common/utilities-functions';

const emptyList = [];

const Player = ({ playerState, index }) => {
  const hostPlayerName = useSelector(state => state.auth.username);
  const hostPlayerHandCards = useSelector(state => state.gameState.handCards);
  const { gameId } = useParams();
  const { hostPlayerState } = useGetGameStateQuery(gameId, {
    selectFromResult: ({ data }) => ({
      currentPlayerStateList: data?.currentPlayerStateList || emptyList,
      hostPlayerState: data?.playersStateList.find(playerEntry(hostPlayerName)),
    }),
  });
  // useSitOutTimer(playerState);

  const isHostPlayer = playerState.playerName === hostPlayerName;
  const playerSubmitted = playerState.submittedHand.length;
  const canSelect = hostPlayerState.selecting;

  const handCards = playerSubmitted
    ? playerState.submittedHand
    : isHostPlayer
    ? hostPlayerHandCards
    : playerState.handCards;

  const style = { gridArea: 'player-' + (index + 1) };
  const className =
    'player p-' + (index + 1) + (playerSubmitted ? ' submitted' : '');

  return (
    <div className={className} style={style}>
      <HandCards
        cards={handCards}
        canBeSelected={!playerSubmitted && isHostPlayer && canSelect}
        bet={playerState.currentBet}
      />
      <div className="player-info">
        <PlayerInfo playerState={playerState} />
        <div className="avatar"></div>
      </div>
    </div>
  );
};

export default memo(Player);
