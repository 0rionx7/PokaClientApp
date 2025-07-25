import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { socket, useGetTablesQuery } from 'features/gameState/gameStateApi';
import { createTableTitle } from 'utils/text-functions';
import ApprovedRequest from 'pages/ApprovedRequest';
import useSnackBar from 'hooks/useSnackBar';
import { useGetUserQuery } from 'features/account/accountApi';
import { useGetTablesChineseQuery } from 'features/gameStateChinese/gameStateApi';

const useRequestResult = chinese => {
  const { refetch } = useGetUserQuery();
  const { refetch: refetchPokaTables } = useGetTablesQuery();
  const { refetch: refetchChineseTables } = useGetTablesChineseQuery();
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
    let event = 'pokaRequestApproved',
      refetchTables = refetchPokaTables;
    if (chinese) {
      event = 'chineseRequestApproved';
      refetchTables = refetchChineseTables;
    }
    socket.on(event, requestInfo => {
      setApprovedPopUp(<ApprovedRequest requestInfo={requestInfo} />);
      refetch();
      refetchTables();
    });
    return () => socket.removeAllListeners(event);
  }, [
    setApprovedPopUp,
    refetch,
    refetchPokaTables,
    refetchChineseTables,
    chinese,
  ]);

  useEffect(() => {
    let event = chinese ? 'chineseRequestRejected' : 'pokaRequestRejected';
    socket.on(event, ({ tableName, showPopUp }) => {
      refetch();
      if (!gameId && showPopUp)
        setRejectPopUp(
          <>
            Η αίτηση συμμετοχής σας για το τραπέζι {createTableTitle(tableName)}{' '}
            απορρίφθηκε.
          </>
        );
    });
    return () => socket.removeAllListeners(event);
  }, [setRejectPopUp, gameId, refetch, chinese]);

  return [approvedElement, rejectedElement];
};

export default useRequestResult;
