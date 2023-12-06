import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  useGetTablesQuery,
  useSitDownMutation,
} from 'features/gameStateSlice/gameApi';
import { setGameInfo } from 'features/gameStateSlice/gameStateSlice';
import { useCancelRequestMutation } from 'features/gameStateSlice/requestsApi';
import './Requests.scss';

const Request = ({ tableIfo }) => {
  const { refetch } = useGetTablesQuery();
  const [sitDown] = useSitDownMutation();
  const [cancelHoveredPropagation, setCancelHoveredPropagation] =
    useState(false);
  const [cancelRequest] = useCancelRequestMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cancelHandler = async (tableName, event) => {
    event.stopPropagation();
    cancelRequest({ tableName });
    refetch();
  };

  const joinTableHandler = async gameId => {
    if (!gameId) return;
    const { data } = await sitDown({ gameId });
    if (!data?.gameId) return;
    dispatch(setGameInfo(data));
    navigate(`/table/${data.gameId}`);
  };

  return (
    <div className={'request-tableName ' + (tableIfo.joined ? 'joined' : '')}>
      {!cancelHoveredPropagation && <div className="tool-tip">Καθήστε</div>}
      <div onClick={joinTableHandler.bind(null, tableIfo.joined)}>
        {tableIfo.tableName?.split('_')?.[0]}
      </div>
      <div
        className="cancel"
        onMouseOver={() => setCancelHoveredPropagation(true)}
        onMouseLeave={() => setCancelHoveredPropagation(false)}
        onClick={cancelHandler.bind(null, tableIfo.tableName)}>
        X<div className="tool-tip">Ακύρωση</div>
      </div>
    </div>
  );
};

export default Request;
