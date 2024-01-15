import './Frame.scss';

const Frame = ({ children, className, style }) => {
  return (
    <div className={'frame ' + (className ?? '')} style={style}>
      {children}
    </div>
  );
};

export default Frame;
