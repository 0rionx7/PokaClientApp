import './Button.scss';

const Button = ({ type = 'button', prompt, className, ...rest }) => {
  return (
    <button className={`btn-base ${className ?? ''}`} type={type} {...rest}>
      {prompt}
    </button>
  );
};

export default Button;
