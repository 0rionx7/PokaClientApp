import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { postMessage } from '@account/slice/accountSlice';
import { socket } from '@store/gameApi';

const socketEvents = [
  'neeext',
  'newMessage',
  'playerJoined',
  'playerRenewed',
  'playerDeals',
  'playerSwapped',
  'playerDenied',
  'playerSittingOut',
  'requestAdded',
];

const useMessageService = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const socketListen = (event) =>
      socket.on(event, (data) => dispatch(postMessage({ event, ...data })));

    socketEvents.forEach(socketListen);

    return () => {
      const stopListen = (event) => socket.removeAllListeners(event);

      socketEvents.forEach(stopListen);
    };
  }, [dispatch]);
};

export default useMessageService;
