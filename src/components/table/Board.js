import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { useGetGameStateQuery } from 'features/gameState/gameStateApi';
import BoardRow from 'components/table/BoardRow';
import './Board.scss';
import Kava from 'components/table/Kava';

const Board = () => {
  const { gameId } = useParams();
  const { data } = useGetGameStateQuery(gameId);

  const totalPot = useMemo(
    () => data?.playersStateList.reduce((acc, curr) => acc + curr.bet, 0),
    [data?.playersStateList]
  );

  return (
    <div className={'board ' + data?.boardClass}>
      {!data?.rowsIndexes?.length && totalPot > 0 && (
        <div className="kaves">
          <div className="pot">ποτ: {totalPot}</div>
          <div className="kaves line-0">
            {data.kaves.map((kavaInfo, i) => (
              <Kava kavaInfo={kavaInfo} key={i} />
            ))}
          </div>
        </div>
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
