import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useReconnectedLoginMutation } from 'features/authSlice/useReconnectedLoginMutation';
import { socket } from 'features/gameApi/gameApi';
import useOnlineStatus from 'hooks/useOnlineStatus';
import useJoinRejected from 'hooks/useJoinRejected';
import useJoinApproved from 'hooks/useJoinApproved';

function App() {
  const { token } = useSelector(state => state.auth);
  const [reconnectedLogin] = useReconnectedLoginMutation();
  const approvedRequestInfo = useJoinApproved();
  const rejectedRequestInfo = useJoinRejected();
  const onlineStatusInfo = useOnlineStatus();

  useEffect(() => {
    socket.on('connect', () => {
      if (token) reconnectedLogin();
    });
    return () => socket.removeAllListeners('connect');
  }, [token, reconnectedLogin]);

  return (
    <>
      {onlineStatusInfo}
      {approvedRequestInfo}
      {rejectedRequestInfo}
      <Outlet />
    </>
  );
}

export default App;
