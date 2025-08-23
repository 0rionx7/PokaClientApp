import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useGetChineseStateQuery } from '@chinese/api/chineseApi';
import { selectUserName } from '@account/api/accountApi';
import { isPlayerState } from '@utils/helper-functions';

const usePlayerStyle = index => {
  const { gameId } = useParams();
  const username = useSelector(selectUserName);
  const { data } = useGetChineseStateQuery(gameId);
  const { playerStates } = data;
  const hostIndex = playerStates.findIndex(isPlayerState(username));

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
