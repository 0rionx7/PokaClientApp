import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useGetChineseStateQuery } from 'chinese/api/chineseApi';
import { selectUserName } from 'account/slice/accountSlice';
import { fantasySvg, foulSvg } from 'assets/svgs/various';
import { isSitting } from 'utils/utilities-functions';
import usePlayerStyle from 'chinese/hooks/usePlayerStyle';
import PlayerRibbon from 'chinese/components/PlayerRibbon';
import RoundScore from 'chinese/components/RoundScore';
import LinesScore from 'chinese/components/LinesScore';
import BoardRow from 'chinese/components/BoardRow';
import Hand from 'chinese/components/Hand';
import classes from './Table.module.scss';
import useTimer from 'chinese/hooks/useTimer';
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
