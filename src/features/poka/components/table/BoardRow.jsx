import { useGetPokaStateQuery } from '@poka/api/pokaApi';
import BoardCard from '@poka/components/table/BoardCard';
import Kaves from '@poka/components/table/Kaves';

const BoardRow = ({ rowIndexes, totalPot, order }) => {
  const { data } = useGetPokaStateQuery();

  const rowClass = (order.isFirst && data.hatClass) || '';

  return (
    <div className={`board-row${rowClass}`}>
      {order.isLast && <Kaves totalPot={totalPot} />}
      {rowIndexes.map((index) => (
        <BoardCard index={index} key={index} />
      ))}
    </div>
  );
};

export default BoardRow;
