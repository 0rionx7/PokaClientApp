import { useState } from 'react';

import useOnlineStatus from 'hooks/useOnlineStatus';
import useSnackBar from 'hooks/useSnackBar';

const useOfflineSnack = () => {
  const isOnline = useOnlineStatus();
  const { snackElement, setSnackInfo } = useSnackBar({
    height: '100%',
    secs: 0,
  });
  const [prevStatus, setPrevStatus] = useState(true);

  if (prevStatus !== isOnline) {
    setPrevStatus(!prevStatus);
    const msg = !isOnline
      ? 'Απώλεια σύνδεσης...\nΠροσπάθεια επανασύνδεσης σε εξέλιξη...'
      : '';
    setSnackInfo(msg);
  }

  return snackElement;
};

export default useOfflineSnack;
