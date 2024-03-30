import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSitDownChineseMutation } from 'features/gameStateChinese/gameStateApi';
import { useCancelRequestChineseMutation } from 'features/account/accountApi';
import ToolTip from 'components/ui/ToolTip';
import './Requests.scss';

const Request = ({ tableInfo }) => {
  const [sitDown, { isSuccess, isLoading }] = useSitDownChineseMutation();
  const [cancelHoveredPropagation, setCancelHoveredPropagation] =
    useState(false);
  const [cancelRequest, { isLoading: canceling }] =
    useCancelRequestChineseMutation();
  const navigate = useNavigate();

  const cancelHandler = async event => {
    if (canceling) return;
    event.stopPropagation();
    cancelRequest(tableInfo);
  };

  const sitDownTableHandler = async (gameId, tableName) => {
    if (!gameId || isLoading || isSuccess) return;
    const { data } = await sitDown({ gameId, tableName });
    if (data?.gameId) navigate(`/chinese/table/${data.gameId}`);
  };

  return (
    <div className={'request-tableName ' + (tableInfo.joined ? 'joined' : '')}>
      {!cancelHoveredPropagation && <ToolTip info="Καθήστε" />}
      <div
        onClick={sitDownTableHandler.bind(
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
