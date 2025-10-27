import { useSyncExternalStore } from 'react';

const useOnlineStatus = () => {
  const isOnline = useSyncExternalStore(subscribe, getSnapshot);

  return isOnline;
};

const getSnapshot = () => navigator.onLine;

// callback passed by react and whenever is called, react returns the snapshot
const subscribe = (callback) => {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);

  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
};

export default useOnlineStatus;
