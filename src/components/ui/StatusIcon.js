import './StatusIcon.scss';

const StatusIcon = ({ playerState }) => {
  let color = 'green',
    status = 'ενεργός';

  if (playerState.sittingOut) {
    color = 'red';
    status = 'απουσιάζει';
  } else if (playerState.resta === 0) {
    color = 'orange';
    status = 'ταπί';
  } else if (!playerState.isSubscribed) {
    color = 'purple';
    status = 'άνευ συνδρομής';
  }
  return (
    <>
      <div
        className="status"
        style={{ backgroundColor: color, justifySelf: 'center' }}
      />
      <div className="tool-tip ">{status}</div>
    </>
  );
};

export default StatusIcon;
