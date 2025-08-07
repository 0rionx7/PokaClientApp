import { useParams } from 'react-router-dom';

import {
  useGetChineseStateQuery,
  useJoinChineseTableMutation,
  useRejectChineseRequestMutation,
} from 'features/chinese/api/chineseApi';
import StatusIcon from 'components/ui/StatusIcon';
import ToolTip from 'components/ui/ToolTip';
import useSnackBar from 'hooks/useSnackBar';

const ListedPlayer = ({ playerState, clickable }) => {
  const { gameId } = useParams();
  const { data } = useGetChineseStateQuery(gameId);
  const [joinTable, { isLoading }] = useJoinChineseTableMutation();
  const { snackElement, setSnackInfo } = useSnackBar();
  const [rejectRequest, { isSuccess, isLoading: rejecting }] =
    useRejectChineseRequestMutation();

  const handleAccept = () => {
    if (!clickable || isLoading || rejecting) return;
    if (data?.playerStates.length === 8)
      return setSnackInfo('έχει συμπληρωθεί το καρέ');
    const { playerName } = playerState;
    const result = joinTable({ playerName, gameId });
    if (result.error?.data) setSnackInfo(result.error.data);
  };

  const handleReject = e => {
    if (rejecting || isSuccess || isLoading) return;
    e.stopPropagation();
    const result = rejectRequest({
      tableName: data?.tableName,
      username: playerState.playerName,
    });
    if (result.error?.data) setSnackInfo(result.error.data);
  };

  return (
    <div
      className="listed-player"
      onClick={handleAccept}
      style={{ cursor: clickable ? 'pointer' : 'inherit' }}>
      <StatusIcon playerState={playerState} />
      <div className="approve">
        {playerState?.playerName}
        {clickable && <ToolTip info="Έγκριση" />}
      </div>
      {clickable && (
        <div className="cancel" onClick={handleReject}>
          X <ToolTip info="Απόρριψη" />
        </div>
      )}
      {snackElement}
    </div>
  );
};

export default ListedPlayer;
