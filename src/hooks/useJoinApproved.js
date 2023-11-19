import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setJoinedRequest } from 'src/features/gameStateSlice/gameStateSlice';
import ApprovedRequest from 'src/pages/ApprovedRequest';
import { socket } from 'src/features/gameApi/gameApi';
import useSnackBar from 'src/hooks/useSnackBar';

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
