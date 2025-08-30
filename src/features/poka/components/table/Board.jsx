

import { useGetPokaStateQuery } from '@poka/api/pokaApi';
import BoardRow from '@poka/components/table/BoardRow';
import Kaves from '@poka/components/table/Kaves';
import { gameConfigs, gameNames } from '@poka/utils/games';
import './Board.scss';

const Board = () => {
  const { data } = useGetPokaStateQuery();
  const { gameName, rowIndexes, hats, playerStates } = data;

  const totalPot = playerStates.reduce((acc, curr) => acc + curr.bet, 0);
  let className = gameConfigs[gameName]?.boardClass;
  if (gameName === gameNames.CORNER)
    className += ` ${rowIndexes.length - (hats && 1)}`;

  return (
    <div className={`board ${className ?? ''}`}>
      {!rowIndexes?.length && totalPot > 0 && <Kaves totalPot={totalPot} />}
      {rowIndexes?.map((rowIndexes, i, { length }) => (
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
