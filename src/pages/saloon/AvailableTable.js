import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useRequestJoinMutation } from 'src/features/gameApi/gameStateMutations/useRequestJoinMutation';
import { setGameInfo } from 'src/features/gameStateSlice/gameStateSlice';
import { createTableTitle } from 'src/common/text-functions';
import useSnackBar from 'src/hooks/useSnackBar';
import './AvailableTables.scss';

const AvailableTable = ({ tableInfo }) => {
  const [requestJoin, { isLoading, error }] = useRequestJoinMutation();
  const { snackElement, setSnackInfo } = useSnackBar();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) setSnackInfo(error.data);
  }, [error, setSnackInfo]);

  const clickHandler = async () => {
    if (isLoading) return;
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
