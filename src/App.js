import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useRedirectedLoginMutation } from 'features/authSlice/useRedirectedLoginMutation';
import { socket } from 'features/gameApi/gameApi';
import useOnlineStatus from 'hooks/useOnlineStatus';
import useJoinRejected from 'hooks/useJoinRejected';
import useJoinApproved from 'hooks/useJoinApproved';

function App() {
  const { token } = useSelector(state => state.auth);
  const [redirectionalLogin] = useRedirectedLoginMutation();
  const approvedRequestInfo = useJoinApproved();
  const rejectedRequestInfo = useJoinRejected();
  const onlineStatusInfo = useOnlineStatus();

  useEffect(() => {
    socket.on('connect', () => {
      if (token) redirectionalLogin();
    });
    return () => socket.removeAllListeners('connect');
  }, [token, redirectionalLogin]);

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
