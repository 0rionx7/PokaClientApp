import { useNavigate } from 'react-router-dom';

import { useSitDownChineseMutation } from 'features/gameStateChinese/gameStateApi';
import {
  useGetUserQuery,
  useRequestJoinChineseMutation,
} from 'features/account/accountApi';
import { createTableTitle } from 'utils/text-functions';
import ToolTip from 'components/ui/ToolTip';
import useSnackBar from 'hooks/useSnackBar';

const AvailableTable = ({ tableInfo }) => {
  const [requestJoin, { isLoading, error, reset: resetJoin }] =
    useRequestJoinChineseMutation();
  const [sitDown, { isLoading: sittingDown, error: sitdownError, reset }] =
    useSitDownChineseMutation();
  const { data } = useGetUserQuery();
  const navigate = useNavigate();
  const { snackElement, setSnackInfo } = useSnackBar({ height: '100%' });

  const joinRequests = data?.joinRequests;

  if (error || sitdownError) {
    setSnackInfo(error?.data || sitdownError.data);
    resetJoin();
    reset();
  }

  const clickHandler = async () => {
    if (isLoading || sittingDown) return;
    if (tableInfo.joined) {
      const { data } = await sitDown({
        gameId: tableInfo.joined,
        tableName: tableInfo.tableName,
      });
      if (data?.gameId) return navigate(`/chinese/table/${data.gameId}`);
    }
    if (joinRequests.length >= 3)
      return setSnackInfo('Έχετε συμπληρώσει των μέγιστο αριθμό αιτήσεων.');

    requestJoin({ tableName: tableInfo.tableName });
  };

  const tableTitle = createTableTitle(tableInfo.tableName);

  return (
    <div
      onClick={clickHandler}
      className={'available-table ' + (tableInfo.joined ? 'joined' : '')}>
      <ToolTip info={tableInfo.joined ? 'Καθήστε' : 'Αιτηθείτε θέση'} />
      {tableTitle}
      {snackElement}
    </div>
  );
};

export default AvailableTable;
