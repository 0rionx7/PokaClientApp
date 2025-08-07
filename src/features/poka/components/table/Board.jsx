import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { useGetPokaStateQuery } from 'poka/api/pokaApi';
import BoardRow from 'poka/components/table/BoardRow';
import Kaves from 'poka/components/table/Kaves';
import { gameConfigs, gameNames } from 'poka/utils/games';
import './Board.scss';

const Board = () => {
  const { gameId } = useParams();
  const { data } = useGetPokaStateQuery(gameId);

  const totalPot = useMemo(
    () => data.playerStates.reduce((acc, curr) => acc + curr.bet, 0),
    [data.playerStates]
  );
  let className = gameConfigs[data.gameName]?.boardClass;
  if (data.gameName === gameNames.CORNER)
    className += ` ${data.rowIndexes.length - (data.hats && 1)}`;

  return (
    <div className={`board ${className ?? ''}`}>
      {!data.rowIndexes?.length && totalPot > 0 && (
        <Kaves totalPot={totalPot} />
      )}
      {data.rowIndexes?.map((rowIndexes, i, { length }) => (
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
