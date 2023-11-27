import { useParams } from 'react-router-dom';

import { useGetGameStateQuery } from 'features/gameStateSlice/gameApi';
import BoardRow from 'components/table/BoardRow';
import './Board.scss';

const Board = () => {
  const { gameId } = useParams();
  const { boardClass, rowsIndexes, pot } = useGetGameStateQuery(gameId, {
    selectFromResult: ({ data }) => ({
      boardClass: data.boardClass,
      rowsIndexes: data.rowsIndexes,
      pot: data.playersStateList.reduce((acc, curr) => acc + curr.bet, 0),
    }),
  });

  return (
    <div className={'board ' + boardClass}>
      {!rowsIndexes?.length && pot > 0 && (
        <div className="pot 0">ποτ: {pot}</div>
      )}
      {rowsIndexes?.map((rowIndexes, i, { length }) => (
        <BoardRow rowIndexes={rowIndexes} row={i} rows={length} key={i} />
      ))}
    </div>
  );
};

export default Board;
