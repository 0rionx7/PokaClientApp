import { useSyncExternalStore } from 'react';

const useOnlineStatus = () => {
  const isOnline = useSyncExternalStore(subscribe, getSnapshot);

  return isOnline;
};

const getSnapshot = () => navigator.onLine;

const subscribe = (callback) => {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);

  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
};

export default useOnlineStatus;
