import { createPortal } from 'react-dom';

const Overlay = ({ className, children, ...rest }) => {
  return (
    <>
      {createPortal(
        <div className={`overlay ${className ?? ''}`} {...rest}>
          {children}
        </div>,
        document.getElementById('overlay')
      )}
    </>
  );
};

export default Overlay;
