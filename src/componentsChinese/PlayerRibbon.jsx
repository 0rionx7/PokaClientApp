import { memo } from 'react';
import { useParams } from 'react-router-dom';

import { useGetGameStateChineseQuery } from 'features/gameStateChinese/gameStateApi';
import { isSeated } from 'utils/utilities-functions';
import './PlayerRibbon.scss';

const PlayerRibbon = ({ playerState }) => {
  const { gameId } = useParams();
  const { data } = useGetGameStateChineseQuery(gameId);
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
      <h3>{playerState.playerName}</h3>
      {isDealing && <div className="dealer-icon">D</div>}
      <div className="score">{playerState.gameScore}</div>
      {/* {isHostBoard && soundJsx} */}
    </div>
  );
};

export default memo(PlayerRibbon);
