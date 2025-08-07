import { useParams } from 'react-router-dom';

import { useGetPokaStateQuery } from 'features/poka/pokaApi';
import Player from 'components/player/Player';

const Players = () => {
  const { gameId } = useParams();
  const { data } = useGetPokaStateQuery(gameId);
  const playerStates = data?.playerStates;

  return (
    <>
      {playerStates.map((playerState, i) => (
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
