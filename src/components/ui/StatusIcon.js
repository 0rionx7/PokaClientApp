import ToolTip from 'components/ui/ToolTip';
import './StatusIcon.scss';

const StatusIcon = ({ playerState }) => {
  let color = 'green',
    status = 'ενεργός';

  if (playerState.sittingOut) {
    color = 'red';
    status = 'δεν έχει καθήσει';
  } else if (playerState.resta === 0) {
    color = 'orange';
    status = 'ταπί';
  } else if (!playerState.isSubscribed) {
    color = 'purple';
    status = 'άνευ συνδρομής';
  }
  return (
    <div
      className="status"
      style={{ backgroundColor: color, justifySelf: 'center' }}>
      <ToolTip info={status} />
    </div>
  );
};

export default StatusIcon;
