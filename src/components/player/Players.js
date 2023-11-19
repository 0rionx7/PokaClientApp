import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useGetGameStateQuery } from 'features/gameApi/gameApi';
import { playerEntry } from 'common/utilities-functions';
import Player from 'components/player/Player';

const emptyList = [];

const Players = () => {
  const { gameId } = useParams();
  const hostPlayerName = useSelector(state => state.auth.username);
  const { playersStateList } = useGetGameStateQuery(gameId, {
    selectFromResult: ({ data }) => {
      const playersStateList = data?.playersStateList.slice();
      const hostIndex = playersStateList.findIndex(playerEntry(hostPlayerName));
      const hostLeadingList = playersStateList.splice(hostIndex);
      return {
        playersStateList: hostLeadingList.concat(playersStateList) || emptyList,
      };
    },
  });

  return (
    <>
      {playersStateList.map((playerState, i) => (
        <Player
          playerState={playerState}
          index={i}
          key={playerState.playerName}
        />
      ))}
    </>
  );
};

export default Players;
