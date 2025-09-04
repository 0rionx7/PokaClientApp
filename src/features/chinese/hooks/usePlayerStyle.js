import { useSelector } from 'react-redux';

import { useGetChineseStateQuery } from '@chinese/api/chineseApi';
import { selectUserName } from '@account/api/accountApi';
import { playerStateOf } from '@utils/helper-functions';

const usePlayerStyle = (index) => {
  const username = useSelector(selectUserName);
  const {
    data: { playerStates },
  } = useGetChineseStateQuery();
  const hostIndex = playerStates.findIndex(playerStateOf(username));

  let gridArea;
  if (playerStates.length === 2)
    gridArea = hostIndex === index ? 'host' : 'other';
  else {
    let count =
      index >= hostIndex
        ? index - hostIndex
        : playerStates.length - (hostIndex - index);
    gridArea = `player-${count}`;
  }
  return gridArea;
};

export default usePlayerStyle;
