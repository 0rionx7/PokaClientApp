import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useRedirectedLoginMutation } from 'src/features/authSlice/useRedirectedLoginMutation';
import useOnlineStatus from 'src/hooks/useOnlineStatus';
import { socket } from 'src/features/gameApi/gameApi';
import useJoinRejected from 'src/hooks/useJoinRejected';
import useJoinApproved from 'src/hooks/useJoinApproved';

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
