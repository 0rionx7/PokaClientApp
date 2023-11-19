import { useParams } from 'react-router-dom';

import { useGetGameStateQuery } from 'src/features/gameApi/gameApi';
import RenderedCard from 'src/components/table/RenderedCard';

const BoardRow = ({ rowIndexes, row, rows }) => {
  const { gameId } = useParams();
  const { rowClass, pot } = useGetGameStateQuery(gameId, {
    selectFromResult: ({ data }) => ({
      pot: data?.playersStateList.reduce((acc, curr) => acc + curr.bet, 0),
      rowClass: data?.rowsClasses?.[row] || '',
    }),
  });
  const potLine = Math.floor(rows / 2);
  let className = 'pot';
  if (rows % 2 === 0) className += ' shift';

  return (
    <div className={'board-row ' + rowClass}>
      {potLine === row && pot > 0 && (
        <div className={className}>ποτ: {pot}</div>
      )}
      {rowIndexes.map(index => (
        <RenderedCard index={index} key={index} />
      ))}
    </div>
  );
};

export default BoardRow;
