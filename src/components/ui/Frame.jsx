import { cn } from '@utils/helper-functions'
import './Frame.scss'

const Frame = ({ children, className, style }) => {
  return (
    <div className={cn('frame', className)} style={style}>
      {children}
    </div>
  )
}

export default Frame
