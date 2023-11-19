import { useEffect, useState } from 'react';
import LoadingSpinner from 'components/ui/LoadingSpinner';

import Overlay from 'components/ui/Overlay';

const useSnackBar = ({ secs = 2, height } = {}) => {
  const [info, setSnackInfo] = useState(null);

  useEffect(() => {
    if (!secs) return;
    const timer = setTimeout(() => setSnackInfo(null), secs * 1000);
    return () => clearTimeout(timer);
  }, [setSnackInfo, secs, info]);

  const backDropClickHandler = () => {
    if (!secs) return;
    setSnackInfo(null);
  };

  const snackElement = info && (
    <Overlay onClick={backDropClickHandler} style={{ height }}>
      <div className="snack-message">
        {info} {!secs && <LoadingSpinner color="red" />}
      </div>
    </Overlay>
  );

  return { snackElement, setSnackInfo };
};

export default useSnackBar;
