import { useParams } from 'react-router-dom';

import {
  useGetGameStateQuery,
  useJoinTableMutation,
  useRejectRequestMutation,
} from 'features/gameState/gameStateApi';
import StatusIcon from 'components/ui/StatusIcon';
import ToolTip from 'components/ui/ToolTip';
import useSnackBar from 'hooks/useSnackBar';

const ListedPlayer = ({ playerState, clickable }) => {
  const { gameId } = useParams();
  const { data } = useGetGameStateQuery(gameId);
  const [joinTable, { isLoading, error, reset }] = useJoinTableMutation();
  const { snackElement, setSnackInfo } = useSnackBar();
  const [rejectRequest, { isSuccess, isLoading: rejecting }] =
    useRejectRequestMutation();

  if (error) {
    setSnackInfo(error.data);
    reset();
  }

  const clickHandler = () => {
    if (!clickable || isLoading || rejecting) return;
    if (data?.playersStateList.length === 8)
      return setSnackInfo('έχει συμπληρωθεί το καρέ');
    const { playerName } = playerState;
    joinTable({ playerName, gameId });
  };

  const cancelHandler = e => {
    if (rejecting || isSuccess || isLoading) return;
    e.stopPropagation();
    rejectRequest({
      tableName: data?.tableName,
      username: playerState.playerName,
      showPopUp: true,
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
        {clickable && <ToolTip info="Έγκριση" />}
      </div>
      {clickable && (
        <div className="cancel" onClick={cancelHandler}>
          X <ToolTip info="Απόρριψη" />
        </div>
      )}
      {snackElement}
    </div>
  );
};

export default ListedPlayer;
