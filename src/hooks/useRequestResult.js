import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { removeRequest, setRequestGameId } from 'features/account/accountSlice';
import { createTableTitle } from 'common/text-functions';
import { socket } from 'features/gameState/gameStateApi';
import ApprovedRequest from 'pages/ApprovedRequest';
import useSnackBar from 'hooks/useSnackBar';

const useRequestResult = () => {
  const username = useSelector(state => state.account.username);
  const { gameId } = useParams();
  const dispatch = useDispatch();
  const { rejectedElement, setRejectPopUp } = useSnackBar({ height: '100%' });
  const { approvedElement, setApprovedPopUp } = useSnackBar({
    height: '100%',
    secs: 7,
  });

  useEffect(() => {
    socket.on('joinApproved', approveInfo => {
      if (approveInfo.username !== username) return;
      dispatch(setRequestGameId(approveInfo));
      setApprovedPopUp(
        <ApprovedRequest
          gameId={approveInfo.gameId}
          tableName={approveInfo.tableName}
        />
      );
    });
    return () => socket.removeAllListeners('joinApproved');
  }, [dispatch, setApprovedPopUp, username]);

  useEffect(() => {
    socket.on('requestCanceled', ({ tableName, showPopUp }) => {
      dispatch(removeRequest(tableName));
      if (!gameId && showPopUp)
        setRejectPopUp(
          <>
            Η αίτηση συμμετοχής σας για το τραπέζι {createTableTitle(tableName)}{' '}
            απορρίφθηκε.
          </>
        );
    });
    return () => socket.removeAllListeners('requestCanceled');
  }, [dispatch, setRejectPopUp, gameId]);

  return { approvedElement, rejectedElement };
};

export default useRequestResult;
