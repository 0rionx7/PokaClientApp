import ToolTip from '@ui/ToolTip'
import './StatusIcon.scss'

const getStatus = (playerState) => {
  switch (true) {
    case playerState.sittingOut:
      return { backgroundColor: 'red', status: 'δεν έχει καθήσει' }
    case playerState.resta === 0:
      return { backgroundColor: 'orange', status: 'ταπί' }
    case !playerState.isSubscribed:
      return { backgroundColor: 'purple', status: 'άνευ συνδρομής' }
    default:
      return { backgroundColor: 'green', status: 'ενεργός' }
  }
}

const StatusIcon = ({ playerState }) => {
  const { backgroundColor, status } = getStatus(playerState)

  return (
    <div className="status" style={{ backgroundColor }}>
      <ToolTip info={status} />
    </div>
  )
}

export default StatusIcon
