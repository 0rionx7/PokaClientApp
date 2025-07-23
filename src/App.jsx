import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { useReconnectedLoginMutation } from 'features/account/accountApi';
import { socket } from 'features/gameState/gameStateApi';
import useRequestChineseResult from 'hooks/useRequestChineseResult';
import useRequestResult from 'hooks/useRequestResult';
import useOfflineSnack from 'hooks/useOfflineSnack';

function App() {
  const { token } = useSelector(state => state.account);
  const [reconnectedLogin] = useReconnectedLoginMutation();
  const { approvedElement, rejectedElement } = useRequestResult();
  const { approvedChElement, rejectedChElement } = useRequestChineseResult();
  const offLineElement = useOfflineSnack();
  console.log('ale');
  useEffect(() => {
    socket.on('connect', () => {
      if (token) reconnectedLogin();
    });
    // socket.on('disconnect', (reason, details) => {
    //   if (token) reconnectedLogin();
    // });
    return () => socket.removeAllListeners('connect');
  }, [token, reconnectedLogin]);

  return (
    <DndProvider backend={HTML5Backend}>
      {/* {offLineElement} */}
      {approvedElement}
      {approvedChElement}
      {rejectedElement}
      {rejectedChElement}
      <Outlet />
    </DndProvider>
  );
}

export default App;
