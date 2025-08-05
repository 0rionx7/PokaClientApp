import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useGetChineseStateQuery } from 'features/chinese/chineseApi';
import { selectUserName } from 'features/account/accountSlice';
import { fantasySvg, foulSvg } from 'assets/svgs/various';
import { isSitting } from 'utils/utilities-functions';
import usePlayerStyle from 'hooks/usePlayerStyle';
import PlayerRibbon from 'componentsChinese/PlayerRibbon';
import RoundScore from 'componentsChinese/RoundScore';
import LinesScore from 'componentsChinese/LinesScore';
import BoardRow from 'componentsChinese/BoardRow';
import Hand from 'componentsChinese/Hand';
import classes from './Table.module.scss';
import useTimer from 'hooks/useTimer';
import './Board.scss';

const Board = ({ index, playerState }) => {
  const username = useSelector(selectUserName);
  const { gameId } = useParams();
  const { data } = useGetChineseStateQuery(gameId);
  const gridArea = usePlayerStyle(index);
  const timerJsx = useTimer(playerState.playerName);

  const isHostBoard = playerState.playerName === username;
  const { currentPlayerList, playerStates } = data;
  const isRoundEnd =
    currentPlayerList.length <= playerStates.filter(isSitting).length;

  return (
    <>
      <div
        className={'board-layout ' + (classes[gridArea] || '')}
        style={{ gridArea }}>
        <PlayerRibbon playerState={playerState} />
        <div className="board-grid">
          <div id={'timer' + playerState.playerName}>{timerJsx}</div>
          <RoundScore
            roundScore={playerState.roundScore}
            showScore={isRoundEnd}
          />
          <BoardRow rowIndex={0} playerState={playerState} />
          <BoardRow rowIndex={1} playerState={playerState} />
          <BoardRow rowIndex={2} playerState={playerState} />
          {playerState.isFoul && <div className="image-overlay">{foulSvg}</div>}
          {playerState.isFantasy && isRoundEnd && (
            <div className="image-overlay">{fantasySvg}</div>
          )}
        </div>
        {isRoundEnd && <LinesScore playerState={playerState} />}
        {isHostBoard && <Hand />}
      </div>
    </>
  );
};

export default Board;
