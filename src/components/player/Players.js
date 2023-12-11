import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useGetGameStateQuery } from 'features/gameState/gameStateApi';
import { playerEntry } from 'common/utilities-functions';
import Player from 'components/player/Player';

const Players = () => {
  const { gameId } = useParams();
  const hostPlayerName = useSelector(state => state.account.username);
  const { data } = useGetGameStateQuery(gameId);

  const playersStateList = useMemo(() => {
    const playersStateList = data?.playersStateList.slice();
    const hostIndex = playersStateList.findIndex(playerEntry(hostPlayerName));
    const hostLeadingList = playersStateList.splice(hostIndex);
    return hostLeadingList.concat(playersStateList);
  }, [data?.playersStateList, hostPlayerName]);

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
