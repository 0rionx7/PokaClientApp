import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { selectPlayerStates, useGetPokaStateQuery } from '@poka/api/pokaApi';
import { selectUserName } from '@account/slice/accountSlice';
import { getPosition } from '@poka/utils/getPosition';
import { isPlayerState } from '@utils/helper-functions';

const usePlayerClass = playerName => {
  const { gameId } = useParams();
  const { data } = useGetPokaStateQuery(gameId);
  const hostPlayerName = useSelector(selectUserName);
  const playerStates = useSelector(selectPlayerStates(gameId));

  const playersCount = playerStates.length;
  const hostIndex = playerStates.findIndex(isPlayerState(hostPlayerName));
  const playerIndex = playerStates.findIndex(isPlayerState(playerName));

  let seat;
  if (data.rotation === 'clockwise') {
    seat =
      hostIndex <= playerIndex
        ? playerIndex - hostIndex + 1
        : playersCount + 1 - (hostIndex - playerIndex);
  } else {
    seat =
      hostIndex < playerIndex
        ? playersCount + 1 - (playerIndex - hostIndex)
        : hostIndex - playerIndex + 1;
  }
  const position = getPosition(playersCount, seat);
  const gridArea = `player-${seat}`;
  const className = `player seat-${seat} ${position}`;

  return { className, gridArea };
};

export default usePlayerClass;
