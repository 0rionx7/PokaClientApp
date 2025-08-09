import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { socket, useGetTablesQuery } from '@store/gameApi';
import { useGetUserQuery } from '@account/api/accountApi';
import { createTableTitleJsx } from '@utils/text-functions';
import ApprovedRequest from '@pages/ApprovedRequest';
import useSnackBar from '@hooks/useSnackBar';

const useRequestResult = chinese => {
  const { gameId } = useParams();
  const { refetch: refetchUserInfo } = useGetUserQuery();
  const { refetch: refetchChineseTables } = useGetTablesQuery('chinese');
  const { refetch: refetchPokaTables } = useGetTablesQuery('poka');
  const { snackElement: rejectedElement, setSnackInfo: setRejectPopUp } =
    useSnackBar({ height: '100%' });
  const { snackElement: approvedElement, setSnackInfo: setApprovedPopUp } =
    useSnackBar({ height: '100%', secs: 7 });

  useEffect(() => {
    let event = 'pokaRequestApproved',
      refetchTables = refetchPokaTables;
    if (chinese) {
      event = 'chineseRequestApproved';
      refetchTables = refetchChineseTables;
    }
    socket.on(event, requestInfo => {
      setApprovedPopUp(<ApprovedRequest requestInfo={requestInfo} />);
      refetchUserInfo();
      refetchTables();
    });
    return () => socket.removeAllListeners(event);
  }, [
    setApprovedPopUp,
    refetchUserInfo,
    refetchPokaTables,
    refetchChineseTables,
    chinese,
  ]);

  useEffect(() => {
    let event = chinese ? 'chineseRequestRejected' : 'pokaRequestRejected';
    socket.on(event, ({ tableName }) => {
      refetchUserInfo();
      if (!gameId) {
        const table = chinese ? ' κινέζικου πόκερ' : ' πόκας';
        setRejectPopUp(
          <>
            Η αίτηση συμμετοχής σας για το τραπέζι{table}{' '}
            {createTableTitleJsx(tableName)} απορρίφθηκε.
          </>
        );
      }
    });

    return () => socket.removeAllListeners(event);
  }, [setRejectPopUp, gameId, refetchUserInfo, chinese]);

  return [approvedElement, rejectedElement];
};

export default useRequestResult;
