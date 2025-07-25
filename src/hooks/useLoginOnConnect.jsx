import { useEffect } from 'react';

import { useRedirectedLoginMutation } from 'features/account/accountApi';
import { socket } from 'features/gameState/gameStateApi';

export default function useLoginOnConnect(token) {
  const [redirectedLogin] = useRedirectedLoginMutation();

  useEffect(() => {
    socket.on('connect', () => redirectedLogin(token));
    return () => {
      socket.removeAllListeners('connect');
    };
  }, [token, redirectedLogin]);
}
