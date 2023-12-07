import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useReconnectedLoginMutation } from 'features/account/accountApi';
import { resetGameState } from 'features/gameState/gameStateSlice';
import { socket } from 'features/gameState/gameStateApi';
import useOnlineStatus from 'hooks/useOnlineStatus';
import useJoinRejected from 'hooks/useJoinRejected';
import useJoinApproved from 'hooks/useJoinApproved';

function App() {
  const { gameId } = useParams();
  const { token } = useSelector(state => state.account);
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
  }, [dispatch, gameId]);

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
