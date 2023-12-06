import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useRequestJoinMutation } from 'features/gameStateSlice/gameApi';
import { createTableTitle } from 'common/text-functions';
import useSnackBar from 'hooks/useSnackBar';
import './AvailableTables.scss';

const AvailableTable = ({ tableInfo }) => {
  const [requestJoin, { isLoading, error }] = useRequestJoinMutation();
  const joinRequests = useSelector(state => state.gameState.joinRequests);
  const { snackElement, setSnackInfo } = useSnackBar({ height: '100%' });

  useEffect(() => {
    if (error) setSnackInfo(error.data);
  }, [error, setSnackInfo]);

  const clickHandler = async () => {
    if (isLoading) return;
    if (joinRequests.length >= 3)
      return setSnackInfo('Έχετε συμπληρώσει των μέγιστο αριθμό αιτήσεων.');
    await requestJoin({ tableName: tableInfo.tableName });
  };

  const tableTitle = createTableTitle(tableInfo.tableName);

  return (
    <div
      onClick={clickHandler}
      className={'available-table ' + (tableInfo.joined ? 'joined' : '')}>
      <div className="tool-tip">
        {tableInfo.joined ? 'Καθήστε' : 'Αιτηθείτε θέση'}
      </div>
      {snackElement}
      {tableTitle}
    </div>
  );
};

export default AvailableTable;
