import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { useGetGameStateQuery } from 'features/gameState/gameStateApi';
import BoardRow from 'components/table/BoardRow';
import './Board.scss';

const Board = () => {
  const { gameId } = useParams();
  const { data } = useGetGameStateQuery(gameId);

  const pot = useMemo(
    () => data?.playersStateList.reduce((acc, curr) => acc + curr.bet, 0),
    [data?.playersStateList]
  );

  return (
    <div className={'board ' + data?.boardClass}>
      {!data?.rowsIndexes?.length && pot > 0 && (
        <div className="pot 0">ποτ: {pot}</div>
      )}
      {data?.rowsIndexes?.map((rowIndexes, i, { length }) => (
        <BoardRow rowIndexes={rowIndexes} row={i} rows={length} key={i} />
      ))}
    </div>
  );
};

export default Board;
