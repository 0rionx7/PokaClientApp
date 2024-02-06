import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useReconnectedLoginMutation } from 'features/account/accountApi';
import { socket } from 'features/gameState/gameStateApi';
import useOnlineStatus from 'hooks/useOnlineStatus';
import useRequestResult from 'hooks/useRequestResult';

function App() {
  const { token } = useSelector(state => state.account);
  const [reconnectedLogin] = useReconnectedLoginMutation();
  const { approvedElement, rejectedElement } = useRequestResult();
  const offLineElement = useOnlineStatus();

  useEffect(() => {
    socket.on('connect', () => {
      if (token) reconnectedLogin();
    });

    return () => socket.removeAllListeners('connect');
  }, [token, reconnectedLogin]);

  return (
    <>
      <div>Hello</div>
      {offLineElement}
      {approvedElement}
      {rejectedElement}
      <Outlet />
    </>
  );
}

export default App;
