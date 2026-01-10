import { cn } from '@utils/helper-functions'
import './LoadingSpinner.scss'

const LoadingSpinner = ({ centered, color }) => {
  const style = { borderColor: `${color || 'aqua'} transparent` }

  return <div className={cn('spinner', { centered })} style={style} />
}

export default LoadingSpinner
