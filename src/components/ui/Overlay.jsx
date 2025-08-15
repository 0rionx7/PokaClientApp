import { createPortal } from 'react-dom';

const Overlay = ({ className, style, onClick, children }) => {
  return (
    <>
      {createPortal(
        <div
          className={`overlay ${className ?? ''}`}
          style={style}
          onClick={onClick}>
          {children}
        </div>,
        document.getElementById('overlay')
      )}
    </>
  );
};

export default Overlay;
