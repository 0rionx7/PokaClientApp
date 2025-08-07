import { useEffect } from 'react';

import { useRedirectedLoginMutation } from 'features/account/api/accountApi';
import { socket } from 'features/poka/pokaApi';

export default function useLoginOnConnect(token) {
  const [redirectedLogin] = useRedirectedLoginMutation();

  useEffect(() => {
    socket.on('connect', () => redirectedLogin(token));
    return () => {
      socket.removeAllListeners('connect');
    };
  }, [token, redirectedLogin]);
}
