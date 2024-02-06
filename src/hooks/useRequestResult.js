import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  requestRejected,
  setRequestGameId,
} from 'features/account/accountSlice';
import { createTableTitle } from 'utils/text-functions';
import { socket } from 'features/gameState/gameStateApi';
import ApprovedRequest from 'pages/ApprovedRequest';
import useSnackBar from 'hooks/useSnackBar';

const useRequestResult = () => {
  const username = useSelector(state => state.account.username);
  const { gameId } = useParams();
  const dispatch = useDispatch();
  const { snackElement: rejectedElement, setSnackInfo: setRejectPopUp } =
    useSnackBar({
      height: '100%',
    });
  const { snackElement: approvedElement, setSnackInfo: setApprovedPopUp } =
    useSnackBar({
      height: '100%',
      secs: 7,
    });

  useEffect(() => {
    socket.on('joinApproved', requestInfo => {
      dispatch(setRequestGameId(requestInfo));
      setApprovedPopUp(<ApprovedRequest requestInfo={requestInfo} />);
    });
    return () => socket.removeAllListeners('joinApproved');
  }, [dispatch, setApprovedPopUp, username]);

  useEffect(() => {
    socket.on('requestRejected', ({ tableName, showPopUp }) => {
      dispatch(requestRejected({ tableName }));
      if (!gameId && showPopUp)
        setRejectPopUp(
          <>
            Η αίτηση συμμετοχής σας για το τραπέζι {createTableTitle(tableName)}{' '}
            απορρίφθηκε.
          </>
        );
    });
    return () => socket.removeAllListeners('requestRejected');
  }, [dispatch, setRejectPopUp, gameId]);

  return { approvedElement, rejectedElement };
};

export default useRequestResult;
