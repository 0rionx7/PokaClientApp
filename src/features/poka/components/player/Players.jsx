import { useSelector } from 'react-redux';

import { selectPlayerStates } from '@poka/api/pokaApi';
import Player from '@poka/components/player/Player';

const Players = () => {
  const playerStates = useSelector(selectPlayerStates);

  return (
    <>
      {playerStates.map(playerState => (
        <Player key={playerState.playerName} playerState={playerState} />
      ))}
    </>
  );
};

export default Players;
