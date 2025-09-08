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
    <div className={`board ${className ?? 'empty'}`}>
      {!rowIndexes?.length && <Kaves totalPot={totalPot} />}
      {rowIndexes?.map((rowIndexes, i, array) => {
        const order = {
          isFirst: i === 0,
          isLast: i === array.length - 1,
        };
        return (
          <BoardRow
            key={i}
            rowIndexes={rowIndexes}
            order={order}
            totalPot={totalPot}
          />
        );
      })}
    </div>
  );
};

export default Board;
