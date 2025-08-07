import { useEffect } from 'react';

import { useRedirectedLoginMutation } from '@account/api/accountApi';
import { socket } from '@poka/api/pokaApi';

export default function useLoginOnConnect(token) {
  const [redirectedLogin] = useRedirectedLoginMutation();

  useEffect(() => {
    socket.on('connect', () => redirectedLogin(token));
    return () => {
      socket.removeAllListeners('connect');
    };
  }, [token, redirectedLogin]);
}
