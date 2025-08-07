import { useEffect, useState } from 'react';
import LoadingSpinner from 'ui/LoadingSpinner';

import Overlay from 'ui/Overlay';

const useSnackBar = ({ secs = 2, height, top } = {}) => {
  const [info, setSnackInfo] = useState(null);

  useEffect(() => {
    if (!secs || info === null) return;
    const timer = setTimeout(() => setSnackInfo(null), secs * 1000);

    return () => clearTimeout(timer);
  }, [setSnackInfo, secs, info]);

  const handleBackDropClick = () => {
    if (!secs) return;
    setSnackInfo(null);
  };

  const snackElement = info && (
    <Overlay
      onClick={handleBackDropClick}
      style={{ height, zIndex: top && 501 }}>
      <div className="snack-message">
        {info} {!secs && <LoadingSpinner color="red" />}
      </div>
    </Overlay>
  );

  return { snackElement, setSnackInfo };
};

export default useSnackBar;
