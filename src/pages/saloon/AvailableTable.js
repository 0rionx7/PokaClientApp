import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useRequestJoinMutation } from 'features/account/requestsApi';
import { useSitDownMutation } from 'features/gameState/gameStateApi';
import { createTableTitle } from 'lib/text-functions';
import ToolTip from 'components/ui/ToolTip';
import useSnackBar from 'hooks/useSnackBar';
import './AvailableTables.scss';

const AvailableTable = ({ tableInfo }) => {
  const [requestJoin, { isLoading, error }] = useRequestJoinMutation();
  const [sitDown, { isLoading: sittingDown, error: sitdownError }] =
    useSitDownMutation();
  const joinRequests = useSelector(state => state.account.joinRequests);
  const navigate = useNavigate();
  const { snackElement, setSnackInfo } = useSnackBar({ height: '100%' });

  useEffect(() => {
    if (error || sitdownError) setSnackInfo(error?.data || sitdownError.data);
  }, [error, sitdownError, setSnackInfo]);

  const clickHandler = async () => {
    if (isLoading || sittingDown) return;
    if (tableInfo.joined) {
      const { data } = await sitDown({
        gameId: tableInfo.joined,
        tableName: tableInfo.tableName,
      });
      if (data?.gameId) return navigate(`/table/${data.gameId}`);
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
