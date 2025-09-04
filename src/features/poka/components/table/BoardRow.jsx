import { useGetPokaStateQuery } from '@poka/api/pokaApi';
import BoardCard from '@poka/components/table/BoardCard';
import Kaves from '@poka/components/table/Kaves';

const BoardRow = ({ rowIndexes, row, rows, totalPot }) => {
  const { data } = useGetPokaStateQuery();

  const potLine = Math.floor(rows / 2);
  const rowClass = data.rowsClasses?.[row] || '';

  return (
    <div className={'board-row ' + rowClass}>
      {potLine === row && totalPot > 0 && (
        <Kaves totalPot={totalPot} rows={rows} />
      )}
      {rowIndexes.map((index) => (
        <BoardCard index={index} key={index} />
      ))}
    </div>
  );
};

export default BoardRow;
