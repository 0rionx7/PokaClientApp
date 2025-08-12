import { useParams } from 'react-router-dom';

import { useGetPokaStateQuery } from '@poka/api/pokaApi';
import Player from '@poka/components/player/Player';

const Players = () => {
  const { gameId } = useParams();
  const { data } = useGetPokaStateQuery(gameId);
  const playerStates = data?.playerStates;

  return (
    <>
      {playerStates.map((playerState, i) => (
        <Player
          key={playerState.playerName}
          playerState={playerState}
          index={i}
        />
      ))}
    </>
  );
};

export default Players;
