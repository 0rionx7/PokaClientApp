import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useGetGameStateChineseQuery } from 'features/gameStateChinese/gameStateApi';
import { selectPlayername } from 'features/account/accountSlice';
import { fantasySvg, foulSvg } from 'assets/svgs/various';
import { isSeated } from 'utils/utilities-functions';
import usePlayerStyle from 'hooks/usePlayerStyle';
import PlayerRibbon from 'componentsChinese/PlayerRibbon';
import RoundScore from 'componentsChinese/RoundScore';
import LinesScore from 'componentsChinese/LinesScore';
import BoardRow from 'componentsChinese/BoardRow';
import Hand from 'componentsChinese/Hand';
import classes from './Table.module.scss';
import './Board.scss';
import { useRef } from 'react';

const Board = ({ index, playerState }) => {
  const username = useSelector(selectPlayername);
  const { gameId } = useParams();
  const { data } = useGetGameStateChineseQuery(gameId);
  const gridArea = usePlayerStyle(index);
  const timerRef = useRef(null);

  const isHostBoard = playerState.playerName === username;
  const { currentPlayerList, playersStateList } = data;
  const isRoundEnd =
    currentPlayerList.length <= playersStateList.filter(isSeated).length;

  return (
    <>
      <div
        className={'board-layout ' + (classes[gridArea] || '')}
        style={{ gridArea }}>
        <PlayerRibbon playerState={playerState} timerRef={timerRef} />
        <div className="board-grid">
          <div id={'timer' + playerState.playerName} ref={timerRef} />
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
