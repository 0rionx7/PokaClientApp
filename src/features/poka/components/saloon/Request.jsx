import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCancelRequestMutation } from '@account/api/accountApi';
import { useSitDownMutation } from '@poka/api/pokaApi';
import ToolTip from '@ui/ToolTip';
import useSnackBar from '@hooks/useSnackBar';
import './Requests.scss';

const Request = ({ tableInfo }) => {
  const [sitDown, { isSuccess, isLoading }] = useSitDownMutation();
  const [cancelHoveredPropagation, setCancelHoveredPropagation] =
    useState(false);
  const [cancelRequest, { isLoading: canceling }] = useCancelRequestMutation();
  const { snackElement, setSnackInfo } = useSnackBar({ height: '100%' });
  const navigate = useNavigate();

  const handleCancel = async event => {
    if (canceling) return;
    event.stopPropagation();
    cancelRequest(tableInfo);
  };

  const handleJoinTable = async (gameId, tableName) => {
    if (!gameId || isLoading || isSuccess) return;
    const result = await sitDown({ gameId, tableName });
    if (result.error?.data) setSnackInfo(result.error.data);
    if (result.data?.gameId) navigate(`/table/${result.data.gameId}`);
  };

  return (
    <div className={'request-tableName ' + (tableInfo.joined ? 'joined' : '')}>
      {!cancelHoveredPropagation && <ToolTip info="Καθήστε" />}
      <div
        onClick={handleJoinTable.bind(
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
        onClick={handleCancel}>
        X <ToolTip info="Ακύρωση" />
      </div>
      {snackElement}
    </div>
  );
};

export default Request;
