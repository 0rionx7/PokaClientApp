import { memo } from 'react';
import { createPortal } from 'react-dom';
import { useParams } from 'react-router-dom';

import { useGetGameStateChineseQuery } from 'features/gameStateChinese/gameStateApi';
import { isSeated } from 'utils/utilities-functions';
import useTimer from 'hooks/useTimer';
import './PlayerRibbon.scss';

const PlayerRibbon = ({ playerState, timerRef }) => {
  const { gameId } = useParams();
  const { data } = useGetGameStateChineseQuery(gameId);
  const timerJsx = useTimer(playerState.playerName);
  const { currentPlayerList, round, playerStates } = data;
  const [currentPlayer] = currentPlayerList;
  const showScore =
    currentPlayerList.length === playerStates.filter(isSeated).length;
  const isActive = playerState.playerName === currentPlayer || showScore;
  const isDealing =
    playerStates[(round - 1) % playerStates.length].playerName ===
    playerState.playerName;
  // const isHostBoard = playerState.playerName === username;
  // const soundJsx = useSound({ ownBoard, isActive });

  return (
    <div className={'playerRibbon ' + (isActive ? 'active' : '')}>
      {timerRef.current && createPortal(timerJsx, timerRef.current)}
      <h3>{playerState.playerName}</h3>
      {isDealing && <div className="dealer-icon">D</div>}
      <div className="score">{playerState.gameScore}</div>
      {/* {isHostBoard && soundJsx} */}
    </div>
  );
};

export default memo(PlayerRibbon);
