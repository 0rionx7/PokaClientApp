import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSitDownMutation } from 'features/gameState/gameStateApi';
import { useCancelRequestMutation } from 'features/account/requestsApi';
import ToolTip from 'components/ui/ToolTip';
import './Requests.scss';

const Request = ({ tableInfo }) => {
  const [sitDown, { isSuccess, isLoading }] = useSitDownMutation();
  const [cancelHoveredPropagation, setCancelHoveredPropagation] =
    useState(false);
  const [cancelRequest, { isSuccess: canceled, isLoading: canceling }] =
    useCancelRequestMutation();
  const navigate = useNavigate();

  const cancelHandler = async event => {
    if (canceling || canceled) return;
    event.stopPropagation();
    cancelRequest(tableInfo);
  };

  const joinTableHandler = async (gameId, tableName) => {
    if (!gameId || isLoading || isSuccess) return;
    const { data } = await sitDown({ gameId, tableName });
    if (data?.gameId) navigate(`/table/${data.gameId}`);
  };

  return (
    <div className={'request-tableName ' + (tableInfo.joined ? 'joined' : '')}>
      {!cancelHoveredPropagation && <ToolTip info="Καθήστε" />}
      <div
        onClick={joinTableHandler.bind(
          null,
          tableInfo.joined,
          tableInfo.tableName
        )}>
        {tableInfo.tableName?.split('_')?.[0]}
      </div>
      <div
        className="cancel"
        onMouseOver={() => setCancelHoveredPropagation(true)}
        onMouseLeave={() => setCancelHoveredPropagation(false)}
        onClick={cancelHandler}>
        X <ToolTip info="Ακύρωση" />
      </div>
    </div>
  );
};

export default Request;
