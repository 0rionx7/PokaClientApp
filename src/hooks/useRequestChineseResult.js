import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useGetTablesChineseQuery } from 'features/gameStateChinese/gameStateApi';
import { socket } from 'features/gameState/gameStateApi';
import { createTableTitle } from 'utils/text-functions';
import ApprovedRequest from 'pages/ApprovedRequest';
import useSnackBar from 'hooks/useSnackBar';
import { useGetUserQuery } from 'features/account/accountApi';

const useRequestChineseResult = () => {
  const { gameId } = useParams();
  const { refetch } = useGetUserQuery();
  const { refetch: refetchTablesChinese } = useGetTablesChineseQuery();
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
    console.log('eeeeeeeeeeeeeeeeeee');
    setApprovedPopUp(
      <ApprovedRequest requestInfo={{ tableName: 1, gameId: 2 }} />
    );
    console.log('---------------------------------');
    socket.on('joinChineseApproved', requestInfo => {
      console.log(requestInfo);
      setApprovedPopUp(<ApprovedRequest requestInfo={requestInfo} />);
      refetch();
      refetchTablesChinese();
    });
    return () => socket.removeAllListeners('joinChineseApproved');
  }, [setApprovedPopUp, refetch, refetchTablesChinese]);

  useEffect(() => {
    socket.on('requestChineseRejected', ({ tableName, showPopUp }) => {
      refetch();
      if (!gameId && showPopUp)
        setRejectPopUp(
          <>
            Η αίτηση συμμετοχής σας για το τραπέζι {createTableTitle(tableName)}{' '}
            απορρίφθηκε.
          </>
        );
    });
    return () => socket.removeAllListeners('requestChineseRejected');
  }, [setRejectPopUp, gameId, refetch]);

  return { approvedElement, rejectedElement };
};

export default useRequestChineseResult;
