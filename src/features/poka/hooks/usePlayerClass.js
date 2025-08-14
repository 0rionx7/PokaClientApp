import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { selectPlayerStates, useGetPokaStateQuery } from '@poka/api/pokaApi';
import { selectUserName } from '@account/slice/accountSlice';
import { getPosition } from '@poka/utils/getPosition';
import { isPlayerState } from '@utils/helper-functions';

const usePlayerClass = index => {
  const { gameId } = useParams();
  const { data } = useGetPokaStateQuery(gameId);
  const hostPlayerName = useSelector(selectUserName);
  const playerStates = useSelector(selectPlayerStates(gameId));

  const playersCount = playerStates.length;
  const hostIndex = playerStates.findIndex(isPlayerState(hostPlayerName));

  let seat;
  if (data.rotation === 'clockwise') {
    seat =
      hostIndex <= index
        ? index - hostIndex + 1
        : playersCount + 1 - (hostIndex - index);
  } else {
    seat =
      hostIndex < index
        ? playersCount + 1 - (index - hostIndex)
        : hostIndex - index + 1;
  }
  const position = getPosition(playersCount, seat);
  const gridArea = `player-${seat}`;
  const className = `player seat-${seat} ${position}`;

  return { className, gridArea };
};

export default usePlayerClass;
