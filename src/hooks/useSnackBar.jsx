import { useEffect, useState } from 'react';
import LoadingSpinner from '@ui/LoadingSpinner';

import ApprovedRequest from '@components/requests/ApprovedRequest';
import GameInfo from '@poka/components/info/GameInfo';
import Overlay from '@ui/Overlay';

const useSnackBar = ({ secs = 2, height, top } = {}) => {
  const [info, setSnackInfo] = useState(null);

  useEffect(() => {
    if (secs === 0 || info === null) return;
    const timer = setTimeout(() => setSnackInfo(null), secs * 1000);

    return () => clearTimeout(timer);
  }, [setSnackInfo, secs, info]);

  const handleBackDropClick = () => {
    if (secs === 0) return;
    setSnackInfo(null);
  };

  const renderItem =
    info === 'GameInfo' ? (
      <GameInfo />
    ) : info?.game ? (
      <ApprovedRequest requestInfo={info} />
    ) : (
      info
    );

  const snackElement = info && (
    <Overlay
      onClick={handleBackDropClick}
      style={{ height, zIndex: top && 501 }}>
      <div className="snack-message">
        {renderItem} {!secs && <LoadingSpinner color="red" />}
      </div>
    </Overlay>
  );

  return { snackElement, setSnackInfo };
};

export default useSnackBar;
