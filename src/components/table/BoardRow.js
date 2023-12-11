import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { useGetGameStateQuery } from 'features/gameState/gameStateApi';
import RenderedCard from 'components/table/RenderedCard';

const BoardRow = ({ rowIndexes, row, rows }) => {
  const { gameId } = useParams();
  const { data } = useGetGameStateQuery(gameId);

  const pot = useMemo(
    () => data.playersStateList.reduce((acc, curr) => acc + curr.bet, 0),
    [data.playersStateList]
  );
  const potLine = Math.floor(rows / 2);
  const rowClass = data.rowsClasses?.[row] || '';
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
