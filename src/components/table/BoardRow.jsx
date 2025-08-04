import { useParams } from 'react-router-dom';

import { useGetGameStateQuery } from 'features/gameState/gameStateApi';
import BoardCard from 'components/table/BoardCard';
import Kaves from 'components/table/Kaves';

const BoardRow = ({ rowIndexes, row, rows, totalPot }) => {
  const { gameId } = useParams();
  const { data } = useGetGameStateQuery(gameId);

  const potLine = Math.floor(rows / 2);
  const rowClass = data.rowsClasses?.[row] || '';

  return (
    <div className={'board-row ' + rowClass}>
      {potLine === row && totalPot > 0 && (
        <Kaves totalPot={totalPot} rows={rows} />
      )}
      {rowIndexes.map(index => (
        <BoardCard index={index} key={index} />
      ))}
    </div>
  );
};

export default BoardRow;
