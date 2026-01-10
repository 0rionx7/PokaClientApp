import { cn } from '@utils/helper-functions'
import './Button.scss'

const Button = ({ prompt, className, ...rest }) => {
  return (
    <button className={cn('btn-base', className)} {...rest}>
      {prompt}
    </button>
  )
}

export default Button
