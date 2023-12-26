import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { useGetGameStateQuery } from 'features/gameState/gameStateApi';
import BoardRow from 'components/table/BoardRow';
import Kaves from 'components/table/Kaves';
import './Board.scss';

const Board = () => {
  const { gameId } = useParams();
  const { data } = useGetGameStateQuery(gameId);

  const totalPot = useMemo(
    () => data?.playersStateList.reduce((acc, curr) => acc + curr.bet, 0),
    [data?.playersStateList]
  );

  return (
    <div className={'board ' + (data?.boardClass ?? '')}>
      {!data?.rowsIndexes?.length && totalPot > 0 && (
        <Kaves totalPot={totalPot} rows={0} />
      )}
      {data?.rowsIndexes?.map((rowIndexes, i, { length }) => (
        <BoardRow
          rowIndexes={rowIndexes}
          row={i}
          rows={length}
          key={i}
          totalPot={totalPot}
        />
      ))}
    </div>
  );
};

export default Board;
