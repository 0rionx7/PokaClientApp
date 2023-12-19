import { useParams } from 'react-router-dom';

import { useGetGameStateQuery } from 'features/gameState/gameStateApi';
import RenderedCard from 'components/table/RenderedCard';
import Kava from 'components/table/Kava';

const BoardRow = ({ rowIndexes, row, rows, totalPot }) => {
  const { gameId } = useParams();
  const { data } = useGetGameStateQuery(gameId);

  const potLine = Math.floor(rows / 2);
  const rowClass = data.rowsClasses?.[row] || '';
  let kavesClass = 'kaves';
  if (rows % 2 === 0) kavesClass += ' shift';
  const showKaves =
    data.kaves[0] && +Object.keys(data.kaves[0])[0] !== totalPot;

  return (
    <div className={'board-row ' + rowClass}>
      {potLine === row && totalPot > 0 && (
        <div className={kavesClass}>
          <div className="pot">ποτ: {totalPot}</div>
          {showKaves &&
            data.kaves.map((kavaInfo, i) => (
              <Kava kavaInfo={kavaInfo} key={i} />
            ))}
        </div>
      )}
      {rowIndexes.map(index => (
        <RenderedCard index={index} key={index} />
      ))}
    </div>
  );
};

export default BoardRow;
