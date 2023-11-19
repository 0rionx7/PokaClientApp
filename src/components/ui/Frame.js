import './Frame.scss';

const Frame = ({ children, className }) => {
  return (
    <div className={'frame ' + (className ? className : '')}>{children}</div>
  );
};

export default Frame;
