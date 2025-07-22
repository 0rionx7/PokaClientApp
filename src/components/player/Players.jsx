import { useParams } from 'react-router-dom';

import { useGetGameStateQuery } from 'features/gameState/gameStateApi';
import Player from 'components/player/Player';

const Players = () => {
  const { gameId } = useParams();
  const { data } = useGetGameStateQuery(gameId);
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
