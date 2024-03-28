import { memo } from 'react';
import { useParams } from 'react-router-dom';

import { useGetGameStateQuery } from 'features/gameState/gameStateApi';
import { isSeated } from 'utils/utilities-functions';
import './PlayerRibbon.scss';

const PlayerRibbon = ({ playerState }) => {
  const { gameId } = useParams();
  const { data } = useGetGameStateQuery(gameId);

  const { currentPlayerList, round, playersStateList } = data;
  // const isHostBoard = playerState.playerName === username;
  const [currentPlayer] = currentPlayerList;
  const showScore =
    currentPlayerList.length === playersStateList.filter(isSeated).length;
  const isActive = playerState.playerName === currentPlayer || showScore;
  const isDealing =
    playersStateList[(round - 1) % playersStateList.length].playerName ===
    playerState.playerName;
  // const soundJsx = useSound({ ownBoard, isActive });

  return (
    <div className={'playerRibbon ' + (isActive ? 'active' : '')}>
      <h3>{playerState.playerName}</h3>
      {isDealing && <div className="dealer">D</div>}
      <div className="score">{playerState.gameScore}</div>
      {/* {isHostBoard && soundJsx} */}
    </div>
  );
};

export default memo(PlayerRibbon);
