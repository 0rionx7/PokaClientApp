import { useGetPokaStateQuery } from '@poka/api/pokaApi';
import BoardCard from '@poka/components/table/BoardCard';

const BoardRow = ({ rowIndexes, row }) => {
  const { data } = useGetPokaStateQuery();

  const rowClass = data.rowsClasses?.[row] || '';

  return (
    <div className={'board-row ' + rowClass}>
      {rowIndexes.map((index) => (
        <BoardCard index={index} key={index} />
      ))}
    </div>
  );
};

export default BoardRow;
