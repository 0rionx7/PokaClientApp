import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setRequestGameId } from 'features/gameStateSlice/gameStateSlice';
import ApprovedRequest from 'pages/ApprovedRequest';
import { socket } from 'features/gameStateSlice/gameApi';
import useSnackBar from 'hooks/useSnackBar';

const useJoinApproved = () => {
  const username = useSelector(state => state.auth.username);
  const dispatch = useDispatch();
  const { snackElement, setSnackInfo } = useSnackBar({
    height: '100%',
    secs: 1000,
  });

  useEffect(() => {
    socket.on('joinApproved', approveInfo => {
      if (approveInfo.username !== username) return;
      dispatch(setRequestGameId(approveInfo));
      setSnackInfo(
        <ApprovedRequest
          gameId={approveInfo.gameId}
          tableName={approveInfo.tableName}
        />
      );
    });
    return () => socket.removeAllListeners('joinApproved');
  }, [dispatch, setSnackInfo, username]);

  return snackElement;
};

export default useJoinApproved;
