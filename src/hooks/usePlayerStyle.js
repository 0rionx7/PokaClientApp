import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useGetGameStateChineseQuery } from 'features/gameStateChinese/gameStateApi';
import { playerEntry } from 'utils/utilities-functions';

const usePlayerStyle = index => {
  const { gameId } = useParams();
  const username = useSelector(state => state.account.username);
  const { data } = useGetGameStateChineseQuery(gameId);
  const { playersStateList } = data;
  const hostIndex = playersStateList.findIndex(playerEntry(username));

  let gridArea;
  if (playersStateList.length === 2)
    gridArea = hostIndex === index ? 'host' : 'other';
  else {
    let count =
      index >= hostIndex
        ? index - hostIndex
        : playersStateList.length - (hostIndex - index);
    gridArea = `player-${count}`;
  }
  return gridArea;
};

export default usePlayerStyle;
