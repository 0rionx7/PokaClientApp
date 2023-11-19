import './Button.scss';

const Button = ({
  color,
  disabled,
  type,
  prompt,
  onClick,
  style,
  className,
}) => {
  return (
    <button
      className={'btn-base ' + (className ? className : '')}
      style={{ ...style, backgroundColor: color }}
      type={type || 'button'}
      disabled={disabled}
      onClick={onClick}>
      {prompt}
    </button>
  );
};

export default Button;
