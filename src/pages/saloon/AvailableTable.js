import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setGameInfo } from 'features/gameStateSlice/gameStateSlice';
import { useRequestJoinMutation } from 'features/gameApi/gameApi';
import { createTableTitle } from 'common/text-functions';
import useSnackBar from 'hooks/useSnackBar';
import './AvailableTables.scss';

const AvailableTable = ({ tableInfo }) => {
  const [requestJoin, { isLoading, error }] = useRequestJoinMutation();
  const joinRequests = useSelector(state => state.gameState.joinRequests);
  const { snackElement, setSnackInfo } = useSnackBar({ height: '100%' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) setSnackInfo(error.data);
  }, [error, setSnackInfo]);

  const clickHandler = async () => {
    if (isLoading) return;
    if (joinRequests.length >= 3)
      return setSnackInfo('Έχετε συμπληρώσει των μέγιστο αριθμό αιτήσεων.');
    const { data } = await requestJoin({ tableName: tableInfo.tableName });
    if (!data?.gameId) return;
    const { id, ...gameInfo } = data;
    dispatch(setGameInfo(gameInfo));
    navigate(`/table/${data.gameId}`);
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
