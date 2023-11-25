import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useRequestJoinMutation } from 'features/gameApi/gameStateMutations/useRequestJoinMutation';
import { useCancelRequestMutation } from 'features/gameApi/gameApi';
import { useGetTablesQuery } from 'features/gameApi/gameApi';
import {
  removeRequest,
  setGameInfo,
} from 'features/gameStateSlice/gameStateSlice';
import './Requests.scss';

const Request = ({ tableIfo }) => {
  const { refetch } = useGetTablesQuery();
  const [cancelHoveredPropagation, setCancelHoveredPropagation] =
    useState(false);
  const [cancelRequest] = useCancelRequestMutation();
  const [requestJoin] = useRequestJoinMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cancelHandler = async (tableName, event) => {
    event.stopPropagation();
    cancelRequest({ tableName });
    refetch();
  };

  const joinTableHandler = async (tableName, approved, _event) => {
    if (!approved) return;
    const { data } = await requestJoin({ tableName });
    dispatch(removeRequest(tableName));
    if (!data.id) return;
    const { id, ...gameInfo } = data;
    dispatch(setGameInfo(gameInfo));
    navigate(`/table/${data.gameId}`);
  };

  return (
    <div className={'request-tableName ' + (tableIfo.joined ? 'joined' : '')}>
      {!cancelHoveredPropagation && <div className="tool-tip">Καθήστε</div>}
      <div
        onClick={joinTableHandler.bind(
          null,
          tableIfo.tableName,
          tableIfo.joined
        )}>
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
