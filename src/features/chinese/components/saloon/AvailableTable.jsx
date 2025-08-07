import { useNavigate } from 'react-router-dom';

import { useSitDownChineseMutation } from 'chinese/api/chineseApi';
import {
  useGetUserQuery,
  useRequestJoinChineseMutation,
} from 'account/api/accountApi';
import { createTableTitleJsx } from 'utils/text-functions';
import ToolTip from 'ui/ToolTip';
import useSnackBar from 'hooks/useSnackBar';

const AvailableTable = ({ tableInfo }) => {
  const [requestJoin, { isLoading }] = useRequestJoinChineseMutation();
  const [sitDown, { isLoading: sittingDown }] = useSitDownChineseMutation();
  const { data } = useGetUserQuery();
  const navigate = useNavigate();
  const { snackElement, setSnackInfo } = useSnackBar({ height: '100%' });

  const joinRequests = data?.joinRequests;

  const handleJoin = async () => {
    if (isLoading || sittingDown) return;
    if (tableInfo.joined) {
      const result = await sitDown({
        gameId: tableInfo.joined,
        tableName: tableInfo.tableName,
      });
      if (result.error?.data) return setSnackInfo(result.error.data);
      if (result.data?.gameId)
        return navigate(`/chinese/table/${result.data?.gameId}`);
    }
    if (joinRequests.length >= 3)
      return setSnackInfo('Έχετε συμπληρώσει των μέγιστο αριθμό αιτήσεων.');

    const result = requestJoin({ tableName: tableInfo.tableName });
    if (result.error?.data) setSnackInfo(result.error.data);
  };

  const tableTitle = createTableTitleJsx(tableInfo.tableName);

  return (
    <div
      onClick={handleJoin}
      className={'available-table ' + (tableInfo.joined ? 'joined' : '')}>
      <ToolTip info={tableInfo.joined ? 'Καθήστε' : 'Αιτηθείτε θέση'} />
      {tableTitle}
      {snackElement}
    </div>
  );
};

export default AvailableTable;
