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
      {totalPot > 0 && <Kaves totalPot={totalPot} />}
      {rowIndexes?.map((rowIndexes, i) => (
        <BoardRow rowIndexes={rowIndexes} row={i} key={i} />
      ))}
    </div>
  );
};

export default Board;
