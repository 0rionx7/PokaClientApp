import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setJoinedRequest } from 'features/gameStateSlice/gameStateSlice';
import ApprovedRequest from 'pages/ApprovedRequest';
import { socket } from 'features/gameStateSlice/gameApi';
import useSnackBar from 'hooks/useSnackBar';

const useJoinApproved = () => {
  const dispatch = useDispatch();
  const { snackElement, setSnackInfo } = useSnackBar({
    height: '100%',
    secs: 1000,
  });

  useEffect(() => {
    socket.on('joinApproved', tableInfo => {
      dispatch(setJoinedRequest(tableInfo.tableName));
      setSnackInfo(<ApprovedRequest tableName={tableInfo.tableName} />);
    });
    return () => socket.removeAllListeners('joinApproved');
  }, [dispatch, setSnackInfo]);

  return snackElement;
};

export default useJoinApproved;
