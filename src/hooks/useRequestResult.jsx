import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { socket, useGetTablesQuery } from 'features/gameState/gameStateApi';
import { createTableTitle } from 'utils/text-functions';
import ApprovedRequest from 'pages/ApprovedRequest';
import useSnackBar from 'hooks/useSnackBar';
import { useGetUserQuery } from 'features/account/accountApi';

const useRequestResult = () => {
  const { refetch } = useGetUserQuery();
  const { refetch: refetchTables } = useGetTablesQuery();
  const { gameId } = useParams();
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
      setApprovedPopUp(<ApprovedRequest requestInfo={requestInfo} />);
      refetch();
      refetchTables();
    });
    return () => socket.removeAllListeners('joinApproved');
  }, [setApprovedPopUp, refetch, refetchTables]);

  useEffect(() => {
    socket.on('requestRejected', ({ tableName, showPopUp }) => {
      refetch();
      if (!gameId && showPopUp)
        setRejectPopUp(
          <>
            Η αίτηση συμμετοχής σας για το τραπέζι {createTableTitle(tableName)}{' '}
            απορρίφθηκε.
          </>
        );
    });
    return () => socket.removeAllListeners('requestRejected');
  }, [setRejectPopUp, gameId, refetch]);

  return { approvedElement, rejectedElement };
};

export default useRequestResult;
