import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { useReconnectedLoginMutation } from 'features/account/api/accountApi';
import { selectToken } from 'features/account/slice/accountSlice';
import { socket } from 'features/poka/pokaApi';
import useRequestResult from 'hooks/useRequestResult';
import useOfflineSnack from 'hooks/useOfflineSnack';

function App() {
  const token = useSelector(selectToken);
  const [reconnectedLogin] = useReconnectedLoginMutation();
  const [approvedElement, rejectedElement] = useRequestResult();
  const [approvedChElement, rejectedChElement] = useRequestResult('chinese');
  const offLineElement = useOfflineSnack();

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
      {offLineElement}
      {approvedElement}
      {approvedChElement}
      {rejectedElement}
      {rejectedChElement}
      <Outlet />
    </DndProvider>
  );
}

export default App;
