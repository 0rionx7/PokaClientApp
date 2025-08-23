import { useParams } from 'react-router-dom';

import { useRejectRequestMutation } from '@account/api/accountApi';
import useSnackBar from '@hooks/useSnackBar';
import StatusIcon from '@ui/StatusIcon';
import ToolTip from '@ui/ToolTip';

const PlayerRequest = ({
  playerState,
  tableName,
  tableFull,
  useJoin,
  clickable,
}) => {
  const { gameId } = useParams();
  const [joinTable, { isLoading }] = useJoin();
  const { snackElement, setSnackInfo } = useSnackBar();
  const [rejectRequest, { isSuccess, isLoading: rejecting }] =
    useRejectRequestMutation();

  const handleJoin = async () => {
    if (!clickable || isLoading || rejecting) return;
    if (tableFull) return setSnackInfo('έχει συμπληρωθεί το καρέ');

    const { playerName } = playerState;
    const result = await joinTable({ playerName, gameId });
    if (result.error?.data) setSnackInfo(result.error.data);
  };

  const handleCancel = async e => {
    if (rejecting || isSuccess || isLoading) return;
    e.stopPropagation();
    const result = await rejectRequest({
      tableName,
      username: playerState.playerName,
    });
    if (result.error?.data) setSnackInfo(result.error.data);
  };

  return (
    <div
      className="player-request"
      onClick={handleJoin}
      style={{ cursor: clickable && 'pointer' }}>
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

export default PlayerRequest;
