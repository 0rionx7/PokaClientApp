import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useGetGameStateQuery } from 'features/gameState/gameStateApi';
import { playerEntry } from 'common/utilities-functions';
import Player from 'components/player/Player';

const Players = () => {
  const { gameId } = useParams();
  const hostPlayerName = useSelector(state => state.account.username);
  const { data } = useGetGameStateQuery(gameId);

  const playersStateList = data?.playersStateList;
  const hostIndex = playersStateList.findIndex(playerEntry(hostPlayerName));

  return (
    <>
      {playersStateList.map((playerState, i, arr) => {
        const seat =
          i >= hostIndex ? i - hostIndex : arr.length + i - hostIndex;
        return (
          <Player
            playerState={playerState}
            seat={seat}
            key={playerState.playerName}
            playersCount={arr.length}
          />
        );
      })}
    </>
  );
};

export default Players;
