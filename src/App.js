import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useReconnectedLoginMutation } from 'features/authSlice/authApi';
import { resetGameState } from 'features/gameStateSlice/gameStateSlice';
import { socket } from 'features/gameStateSlice/gameApi';
import useOnlineStatus from 'hooks/useOnlineStatus';
import useJoinRejected from 'hooks/useJoinRejected';
import useJoinApproved from 'hooks/useJoinApproved';

function App() {
  const { gameId } = useParams();
  const { token } = useSelector(state => state.auth);
  const [reconnectedLogin] = useReconnectedLoginMutation();
  const approvedRequestInfo = useJoinApproved();
  const rejectedRequestInfo = useJoinRejected();
  const onlineStatusInfo = useOnlineStatus();
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('connect', () => {
      if (token) reconnectedLogin();
    });
    return () => socket.removeAllListeners('connect');
  }, [token, reconnectedLogin]);

  useEffect(() => {
    if (!gameId) dispatch(resetGameState());
  }, [gameId]);

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
