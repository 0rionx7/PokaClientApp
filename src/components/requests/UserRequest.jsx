import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCancelRequestMutation } from '@account/api/accountApi';
import ToolTip from '@ui/ToolTip';
import useSnackBar from '@hooks/useSnackBar';
import './Requests.scss';

const UserRequest = ({ tableInfo, useSitDown }) => {
  const [sitDown, { isSuccess, isLoading }] = useSitDown();
  const [cancelHoveredPropagation, setCancelHoveredPropagation] =
    useState(false);
  const [cancelRequest, { isLoading: canceling }] = useCancelRequestMutation();
  const { snackElement, setSnackInfo } = useSnackBar({ height: '100%' });
  const navigate = useNavigate();

  const handleCancelRequest = async event => {
    if (canceling) return;
    event.stopPropagation();
    cancelRequest(tableInfo);
  };

  const handleJoinTable = async (gameId, tableName) => {
    if (!gameId || isLoading || isSuccess) return;
    const result = await sitDown({ gameId, tableName });
    if (result.error?.data) setSnackInfo(result.error.data);
    if (result.data?.gameId)
      navigate(`/${result.data.game}/table/${result.data.gameId}`, {
        state: { game: 'poka' },
      });
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
        onClick={handleCancelRequest}>
        X <ToolTip info="Ακύρωση" />
      </div>
      {snackElement}
    </div>
  );
};

export default UserRequest;
