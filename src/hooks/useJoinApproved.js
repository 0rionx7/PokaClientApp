import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { socket } from 'features/gameState/gameStateApi';
import ApprovedRequest from 'pages/ApprovedRequest';
import useSnackBar from 'hooks/useSnackBar';
import { setRequestGameId } from 'features/account/accountSlice';

const useJoinApproved = () => {
  const username = useSelector(state => state.account.username);
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
