import { useNavigate } from 'react-router-dom';

import {
  useGetUserQuery,
  useRequestJoinMutation,
} from '@account/api/accountApi';
import { createTableTitleJsx } from '@utils/text-functions';
import ToolTip from '@ui/ToolTip';
import useSnackBar from '@hooks/useSnackBar';
import './AvailableTables.scss';

const AvailableTable = ({ tableName, joined, useSitDown, game }) => {
  const navigate = useNavigate();
  const [requestJoin, { isLoading }] = useRequestJoinMutation();
  const [sitDown, { isLoading: sittingDown }] = useSitDown();
  const { data } = useGetUserQuery();
  const { snackElement, setSnackInfo } = useSnackBar({ height: '100%' });
  const joinRequests = data?.joinRequests;

  const handleJoinTable = async () => {
    if (isLoading || sittingDown) return;
    if (joined) {
      const result = await sitDown({
        gameId: joined,
        tableName: tableName,
      });
      if (result.error?.data) setSnackInfo(result.error.data);
      if (result.data?.gameId) return navigate(`/table/${result.data.gameId}`);
    }

    if (joinRequests?.length >= 3)
      return setSnackInfo('Έχετε συμπληρώσει των μέγιστο αριθμό αιτήσεων.');

    const result = await requestJoin({ tableName, game });
    if (result.error?.data) setSnackInfo(result.error.data);
  };

  const tableTitle = createTableTitleJsx(tableName);

  return (
    <div
      onClick={handleJoinTable}
      className={`available-table ${joined ? 'joined' : ''}`}>
      <ToolTip info={joined ? 'Καθήστε' : 'Αιτηθείτε θέση'} />
      {tableTitle}
      {snackElement}
    </div>
  );
};

export default AvailableTable;
