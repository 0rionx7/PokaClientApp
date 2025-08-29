import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { socket, useGetTablesQuery } from '@store/gameApi';
import { useGetUserQuery } from '@account/api/accountApi';
import { createTableTitleJsx } from '@utils/text-functions';
import useSnackBar from '@hooks/useSnackBar';

const useRequestResult = () => {
  const { gameId } = useParams();
  const { refetch: refetchUserInfo } = useGetUserQuery();
  const { refetch: refetchChineseTables } = useGetTablesQuery('chinese');
  const { refetch: refetchPokaTables } = useGetTablesQuery('poka');
  const { snackElement: rejectedElement, setSnackInfo: setRejectPopUp } =
    useSnackBar({ height: '100%' });
  const { snackElement: approvedElement, setSnackInfo: setApprovedPopUp } =
    useSnackBar({ height: '100%', secs: 37 });

  useEffect(() => {
    socket.on('requestApproved', requestInfo => {
      setApprovedPopUp(requestInfo);
      refetchUserInfo();
      requestInfo.game === 'poka'
        ? refetchPokaTables()
        : refetchChineseTables();
    });
    return () => socket.removeAllListeners('requestApproved');
  }, [
    setApprovedPopUp,
    refetchUserInfo,
    refetchPokaTables,
    refetchChineseTables,
  ]);

  useEffect(() => {
    socket.on('requestRejected', ({ tableName, game }) => {
      refetchUserInfo();
      if (!gameId) {
        const kind = game === 'poka' ? 'πόκας' : 'κινέζικου πόκερ';
        setRejectPopUp(
          <>
            Η αίτηση συμμετοχής σας για το τραπέζι <b>{kind}</b>
            {createTableTitleJsx(tableName)} απορρίφθηκε.
          </>
        );
      }
    });

    return () => socket.removeAllListeners('requestRejected');
  }, [setRejectPopUp, gameId, refetchUserInfo]);

  return [approvedElement, rejectedElement];
};

export default useRequestResult;
