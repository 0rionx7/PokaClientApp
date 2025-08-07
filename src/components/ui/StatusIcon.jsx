import ToolTip from '@ui/ToolTip';
import './StatusIcon.scss';

const getStatus = playerState => {
  if (playerState.sittingOut)
    return { color: 'red', status: 'δεν έχει καθήσει' };
  if (playerState.resta === 0) return { color: 'orange', status: 'ταπί' };
  if (!playerState.isSubscribed)
    return { color: 'purple', status: 'άνευ συνδρομής' };
  return { color: 'green', status: 'ενεργός' };
};

const StatusIcon = ({ playerState }) => {
  const { color, status } = getStatus(playerState);

  return (
    <div className="status" style={{ backgroundColor: color }}>
      <ToolTip info={status} />
    </div>
  );
};

export default StatusIcon;
