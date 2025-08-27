import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectPlayerStates } from '@poka/api/pokaApi';
import Player from '@poka/components/player/Player';

const Players = () => {
  const { gameId } = useParams();
  const playerStates = useSelector(state => selectPlayerStates(state, gameId));

  return (
    <>
      {playerStates.map(playerState => (
        <Player key={playerState.playerName} playerState={playerState} />
      ))}
    </>
  );
};

export default Players;
