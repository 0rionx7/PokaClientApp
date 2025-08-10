import { useLocation, useNavigate } from 'react-router-dom';

import {
  useGetUserQuery,
  useRequestJoinMutation,
} from '@account/api/accountApi';
import { createTableTitleJsx } from '@utils/text-functions';
import ToolTip from '@ui/ToolTip';
import useSnackBar from '@hooks/useSnackBar';
import './AvailableTables.scss';

const AvailableTable = ({ tableName, joined, useSitDown }) => {
  const navigate = useNavigate();
  const [requestJoin, { isLoading }] = useRequestJoinMutation();
  const [sitDown, { isLoading: sittingDown }] = useSitDown();
  const { data } = useGetUserQuery();
  const { snackElement, setSnackInfo } = useSnackBar({ height: '100%' });
  const { state } = useLocation();

  const joinRequests = data?.joinRequests;

  const handleJoinTable = async () => {
    if (isLoading || sittingDown) return;
    if (joined) {
      const result = await sitDown({
        gameId: joined,
        tableName: tableName,
      });
      if (result.error?.data) setSnackInfo(result.error.data);
      if (result.data?.gameId)
        return navigate(`/${result.data.game}/table/${result.data.gameId}`, {
          state: { game: result.data.game },
        });
    }

    if (joinRequests?.length >= 3)
      return setSnackInfo('Έχετε συμπληρώσει των μέγιστο αριθμό αιτήσεων.');

    const result = await requestJoin({ tableName, game: state.game });
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
