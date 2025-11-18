import './Button.scss'

const Button = ({ prompt, className, ...rest }) => {
  return (
    <button className={`btn-base ${className ?? ''}`} {...rest}>
      {prompt}
    </button>
  )
}

export default Button
