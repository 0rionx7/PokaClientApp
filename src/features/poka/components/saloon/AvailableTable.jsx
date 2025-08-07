import { useNavigate } from 'react-router-dom';

import { useSitDownMutation } from 'poka/api/pokaApi';
import {
  useGetUserQuery,
  useRequestJoinMutation,
} from 'account/api/accountApi';
import { createTableTitleJsx } from 'utils/text-functions';
import ToolTip from 'ui/ToolTip';
import useSnackBar from 'hooks/useSnackBar';
import './AvailableTables.scss';

const AvailableTable = ({ tableInfo }) => {
  const navigate = useNavigate();
  const [requestJoin, { isLoading }] = useRequestJoinMutation();
  const [sitDown, { isLoading: sittingDown }] = useSitDownMutation();
  const { data } = useGetUserQuery();
  const { snackElement, setSnackInfo } = useSnackBar({ height: '100%' });
  const joinRequests = data?.joinRequests;

  const handleJoinTable = async () => {
    if (isLoading || sittingDown) return;
    if (tableInfo.joined) {
      const result = await sitDown({
        gameId: tableInfo.joined,
        tableName: tableInfo.tableName,
      });
      if (result.error?.data) setSnackInfo(result.error.data);
      if (result.data?.gameId) return navigate(`/table/${result.data.gameId}`);
    }

    if (joinRequests?.length >= 3)
      return setSnackInfo('Έχετε συμπληρώσει των μέγιστο αριθμό αιτήσεων.');

    const result = await requestJoin({ tableName: tableInfo.tableName });
    if (result.error?.data) setSnackInfo(result.error.data);
  };

  const tableTitle = createTableTitleJsx(tableInfo.tableName);

  return (
    <div
      onClick={handleJoinTable}
      className={'available-table ' + (tableInfo.joined ? 'joined' : '')}>
      <ToolTip info={tableInfo.joined ? 'Καθήστε' : 'Αιτηθείτε θέση'} />
      {tableTitle}
      {snackElement}
    </div>
  );
};

export default AvailableTable;
