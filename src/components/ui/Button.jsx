import './Button.scss';

const Button = ({ disabled, type, prompt, onClick, style, className }) => {
  return (
    <button
      className={'btn-base ' + (className ?? '')}
      style={{ ...style }}
      type={type || 'button'}
      disabled={disabled}
      onClick={onClick}>
      {prompt}
    </button>
  );
};

export default Button;
