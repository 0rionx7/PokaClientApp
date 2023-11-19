import { useEffect } from 'react';

import useSnackBar from 'src/hooks/useSnackBar';

const useOnlineStatus = () => {
  const { snackElement, setSnackInfo } = useSnackBar({
    height: '100%',
    secs: 0,
  });

  useEffect(() => {
    const onLineHandler = _ => setSnackInfo('');
    const offLineHandler = _ =>
      setSnackInfo(
        'Απώλεια σύνδεσης...\nΠροσπάθεια επανασύνδεσης σε εξέλιξη...'
      );

    window.addEventListener('online', onLineHandler);
    window.addEventListener('offline', offLineHandler);

    return () => {
      window.removeEventListener('online', onLineHandler);
      window.removeEventListener('offline', offLineHandler);
    };
  }, [setSnackInfo]);

  return snackElement;
};

export default useOnlineStatus;
