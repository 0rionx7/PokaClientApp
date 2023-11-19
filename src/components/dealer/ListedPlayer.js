import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useJoinTableMutation } from 'src/features/gameApi/gameStateMutations/useJoinTableMutation';
import { useCancelRequestMutation } from 'src/features/gameApi/gameStateMutations/useCancelRequestMutation';
import { useGetGameStateQuery } from 'src/features/gameApi/gameApi';
import StatusIcon from 'src/components/ui/StatusIcon';
import useSnackBar from 'src/hooks/useSnackBar';

const ListedPlayer = ({ playerState, clickable }) => {
  const { gameId } = useParams();
  const { tableName } = useGetGameStateQuery(gameId, {
    selectFromResult: ({ data }) => ({ tableName: data?.tableName }),
  });
  const [joinTable, { isLoading, error }] = useJoinTableMutation();
  const { snackElement, setSnackInfo } = useSnackBar();
  const [cancelRequest] = useCancelRequestMutation();

  useEffect(() => {
    if (error) setSnackInfo(error.message);
  }, [error, setSnackInfo]);

  const clickHandler = () => {
    if (clickable && !isLoading) joinTable(playerState);
  };

  const cancelHandler = e => {
    e.stopPropagation();
    cancelRequest({
      tableName,
      userName: playerState.playerName,
      socketId: playerState.socketId,
    });
  };

  return (
    <div
      className="listed-player"
      onClick={clickHandler}
      style={{ cursor: clickable ? 'pointer' : 'inherit' }}>
      <StatusIcon playerState={playerState} />
      <div className="approve">
        {playerState?.playerName}
        {clickable && <div className="tool-tip ">Έγκριση</div>}
      </div>
      {clickable && (
        <div className="cancel" onClick={cancelHandler}>
          X<div className="tool-tip ">Απόρριψη</div>
        </div>
      )}
      {snackElement}
    </div>
  );
};

export default ListedPlayer;
