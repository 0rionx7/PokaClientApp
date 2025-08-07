import { useParams } from 'react-router-dom';

import {
  useGetPokaStateQuery,
  useJoinTableMutation,
  useRejectRequestMutation,
} from 'poka/api/pokaApi';
import StatusIcon from 'ui/StatusIcon';
import ToolTip from 'ui/ToolTip';
import useSnackBar from 'hooks/useSnackBar';

const ListedPlayer = ({ playerState, clickable }) => {
  const { gameId } = useParams();
  const { data } = useGetPokaStateQuery(gameId);
  const [joinTable, { isLoading }] = useJoinTableMutation();
  const { snackElement, setSnackInfo } = useSnackBar();
  const [rejectRequest, { isSuccess, isLoading: rejecting }] =
    useRejectRequestMutation();

  const handleJoin = async () => {
    if (!clickable || isLoading || rejecting) return;
    if (data?.playerStates.length === 8)
      return setSnackInfo('έχει συμπληρωθεί το καρέ');

    const { playerName } = playerState;
    const result = await joinTable({ playerName, gameId });
    if (result.error?.data) setSnackInfo(result.error.data);
  };

  const handleCancel = async e => {
    if (rejecting || isSuccess || isLoading) return;
    e.stopPropagation();
    const result = await rejectRequest({
      tableName: data?.tableName,
      username: playerState.playerName,
    });
    if (result.error?.data) setSnackInfo(result.error.data);
  };

  return (
    <div
      className="listed-player"
      onClick={handleJoin}
      style={{ cursor: clickable ? 'pointer' : 'inherit' }}>
      <StatusIcon playerState={playerState} />
      <div className="approve">
        {playerState?.playerName}
        {clickable && <ToolTip info="Έγκριση" />}
      </div>
      {clickable && (
        <div className="cancel" onClick={handleCancel}>
          X <ToolTip info="Απόρριψη" />
        </div>
      )}
      {snackElement}
    </div>
  );
};

export default ListedPlayer;
