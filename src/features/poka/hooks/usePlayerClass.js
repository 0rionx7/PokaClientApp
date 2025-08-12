import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useGetPokaStateQuery } from '@poka/api/pokaApi';
import { selectUserName } from '@account/slice/accountSlice';
import { getPosition } from '@poka/utils/getPosition';
import { playerEntry } from '@utils/utilities-functions';

const usePlayerClass = index => {
  const { gameId } = useParams();
  const { data } = useGetPokaStateQuery(gameId);
  const hostPlayerName = useSelector(selectUserName);

  const playersCount = data?.playerStates.length;
  const hostIndex = data?.playerStates.findIndex(playerEntry(hostPlayerName));

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
