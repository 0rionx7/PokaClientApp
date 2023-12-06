import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import {
  useGetGameStateQuery,
  useJoinTableMutation,
} from 'features/gameStateSlice/gameApi';
import StatusIcon from 'components/ui/StatusIcon';
import useSnackBar from 'hooks/useSnackBar';
import { useCancelRequestMutation } from 'features/gameStateSlice/requestsApi';

const ListedPlayer = ({ playerState, clickable }) => {
  const { gameId } = useParams();
  const { tableName, playersStateList } = useGetGameStateQuery(gameId, {
    selectFromResult: ({ data }) => ({
      tableName: data?.tableName,
      playersStateList: data?.playersStateList,
    }),
  });
  const [joinTable, { isLoading, error }] = useJoinTableMutation();
  const { snackElement, setSnackInfo } = useSnackBar();
  const [cancelRequest] = useCancelRequestMutation();

  useEffect(() => {
    if (error) setSnackInfo(error.message);
  }, [error, setSnackInfo]);

  const clickHandler = () => {
    if (playersStateList.length === 8)
      return setSnackInfo('έχει συμπληρωθεί το καρέ');
    if (clickable && !isLoading) {
      const { playerName } = playerState;
      joinTable({ playerName, gameId });
    }
  };

  const cancelHandler = e => {
    e.stopPropagation();
    cancelRequest({
      tableName,
      username: playerState.playerName,
      showInfo: true,
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
