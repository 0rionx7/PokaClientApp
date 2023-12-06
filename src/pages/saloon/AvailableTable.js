import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useRequestJoinMutation } from 'features/gameStateSlice/requestsApi';
import { useSitDownMutation } from 'features/gameStateSlice/gameApi';
import { setGameInfo } from 'features/gameStateSlice/gameStateSlice';
import { createTableTitle } from 'common/text-functions';
import useSnackBar from 'hooks/useSnackBar';
import './AvailableTables.scss';

const AvailableTable = ({ tableInfo }) => {
  const [requestJoin, { isLoading, error }] = useRequestJoinMutation();
  const [sitDown, { isLoading: sittingDown, error: sitdownError }] =
    useSitDownMutation();
  const joinRequests = useSelector(state => state.gameState.joinRequests);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { snackElement, setSnackInfo } = useSnackBar({ height: '100%' });

  useEffect(() => {
    if (error || sitdownError) setSnackInfo(error.data || sitdownError.data);
  }, [error, sitdownError, setSnackInfo]);

  const clickHandler = async () => {
    if (isLoading || sittingDown) return;
    if (tableInfo.joined) {
      const { data } = await sitDown({ gameId: tableInfo.joined });
      if (!data?.gameId) return;
      dispatch(setGameInfo(data));
      navigate(`/table/${data.gameId}`);
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
      <div className="tool-tip">
        {tableInfo.joined ? 'Καθήστε' : 'Αιτηθείτε θέση'}
      </div>
      {snackElement}
      {tableTitle}
    </div>
  );
};

export default AvailableTable;
