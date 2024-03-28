import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useGetGameStateQuery } from 'features/chineseGameState/gameStateApi';
import { fantasySvg, foulSvg } from 'assets/svgs/various';
import { isSeated } from 'utils/utilities-functions';
import RoundScore from 'componentsChinese/RoundScore';
import usePlayerStyle from 'hooks/usePlayerStyle';
import PlayerRibbon from './PlayerRibbon';
import LinesScore from './LinesScore';
import BoardRow from './BoardRow';
import Hand from './Hand';
import './Board.scss';
import useTimer from 'hooks/useTimer';

const Board = ({ index, playerState }) => {
  const { username } = useSelector(state => state.account);
  const { gameId } = useParams();
  const { data } = useGetGameStateQuery(gameId);
  const gridArea = usePlayerStyle(index);
  const timerJsx = useTimer(playerState.playerName);

  const isHostBoard = playerState.playerName === username;
  const { currentPlayerList, playersStateList } = data;
  const showScore =
    currentPlayerList.length === playersStateList.filter(isSeated).length;

  return (
    <>
      <div className="board-layout" style={{ gridArea }}>
        <PlayerRibbon playerState={playerState} />
        <div className="board-grid">
          {timerJsx}
          <RoundScore
            roundScore={playerState.roundScore}
            showScore={showScore}
          />
          <BoardRow rowIndex={0} playerState={playerState} />
          <BoardRow rowIndex={1} playerState={playerState} />
          <BoardRow rowIndex={2} playerState={playerState} />
          {playerState.isFoul && <div className="image-overlay">{foulSvg}</div>}
          {playerState.isFantasy && showScore && (
            <div className="image-overlay">{fantasySvg}</div>
          )}
        </div>
        {showScore && <LinesScore playerState={playerState} />}
      </div>
      {isHostBoard && <Hand />}
    </>
  );
};

export default Board;
