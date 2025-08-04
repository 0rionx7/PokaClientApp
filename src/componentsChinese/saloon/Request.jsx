import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSitDownChineseMutation } from 'features/gameStateChinese/gameStateApi';
import { useCancelRequestChineseMutation } from 'features/account/accountApi';
import ToolTip from 'components/ui/ToolTip';

const Request = ({ tableInfo }) => {
  const [sitDown, { isSuccess, isLoading }] = useSitDownChineseMutation();
  const [cancelHoveredPropagation, setCancelHoveredPropagation] =
    useState(false);
  const [cancelRequest, { isLoading: canceling }] =
    useCancelRequestChineseMutation();
  const navigate = useNavigate();

  const handleCancelRequest = async event => {
    event.stopPropagation();
    if (canceling) return;
    cancelRequest(tableInfo);
  };

  const handleJoinTable = async () => {
    if (!tableInfo.joined || isLoading || isSuccess) return;
    const { data } = await sitDown({
      gameId: tableInfo.joined,
      tableName: tableInfo.tableName,
    });
    if (data?.gameId) navigate(`/chinese/table/${data.gameId}`);
  };

  return (
    <div className={'request-tableName ' + (tableInfo.joined ? 'joined' : '')}>
      {!cancelHoveredPropagation && <ToolTip info="Καθήστε" />}
      <div onClick={handleJoinTable}>
        {tableInfo.tableName?.split('_')?.[0]}
      </div>
      <div
        className="cancel"
        onMouseOver={() => setCancelHoveredPropagation(true)}
        onMouseLeave={() => setCancelHoveredPropagation(false)}
        onClick={handleCancelRequest}>
        X <ToolTip info="Ακύρωση" />
      </div>
    </div>
  );
};

export default Request;
