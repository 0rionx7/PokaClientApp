import { useEffect } from 'react';

import { useRedirectedLoginMutation } from '@account/api/accountApi';
import { socket } from '@store/gameApi';

export default function useLoginOnConnect(token) {
  const [redirectedLogin] = useRedirectedLoginMutation();

  useEffect(() => {
    socket.on('connect', () => redirectedLogin(token));
    return () => {
      socket.removeAllListeners('connect');
    };
  }, [token, redirectedLogin]);
}
