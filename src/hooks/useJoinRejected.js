import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { socket } from 'features/gameStateSlice/gameApi';
import { removeRequest } from 'features/gameStateSlice/gameStateSlice';
import { createTableTitle } from 'common/text-functions';
import useSnackBar from 'hooks/useSnackBar';

const useJoinRejected = () => {
  const { snackElement, setSnackInfo } = useSnackBar({ height: '100%' });
  const dispatch = useDispatch();
  const { gameId } = useParams();

  useEffect(() => {
    socket.on('requestCanceled', ({ tableName, showInfo }) => {
      dispatch(removeRequest(tableName));
      if (!gameId && showInfo)
        setSnackInfo(
          <>
            Η αίτηση συμμετοχής σας για το τραπέζι {createTableTitle(tableName)}{' '}
            απορρίφθηκε.
          </>
        );
    });
    return () => socket.removeAllListeners('requestCanceled');
  }, [dispatch, setSnackInfo, gameId]);

  return snackElement;
};

export default useJoinRejected;
