import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import {
  useGetGameStateQuery,
  useJoinTableMutation,
} from 'features/gameState/gameStateApi';
import { useRejectRequestMutation } from 'features/account/requestsApi';
import StatusIcon from 'components/ui/StatusIcon';
import useSnackBar from 'hooks/useSnackBar';

const ListedPlayer = ({ playerState, clickable }) => {
  const { gameId } = useParams();
  const { data } = useGetGameStateQuery(gameId);
  const [joinTable, { isLoading, error }] = useJoinTableMutation();
  const { snackElement, setSnackInfo } = useSnackBar();
  const [rejectRequest] = useRejectRequestMutation();

  useEffect(() => {
    if (error) setSnackInfo(error.message);
  }, [error, setSnackInfo]);

  const clickHandler = () => {
    if (data?.playersStateList.length === 8)
      return setSnackInfo('έχει συμπληρωθεί το καρέ');
    if (clickable && !isLoading) {
      const { playerName } = playerState;
      joinTable({ playerName, gameId });
    }
  };

  const cancelHandler = e => {
    e.stopPropagation();
    rejectRequest({
      tableName: data?.tableName,
      username: playerState.playerName,
      showPopUp: true,
    });
  };

  return (
    <div
      className="listed-player"
      onClick={clickHandler}
      style={{ cursor: clickable ? 'pointer' : 'inherit' }}>
      <StatusIcon playerState={playerState} />
      <div className="approve">
        {playerState?.playerName}
        {clickable && <div className="tool-tip ">Έγκριση</div>}
      </div>
      {clickable && (
        <div className="cancel" onClick={cancelHandler}>
          X<div className="tool-tip ">Απόρριψη</div>
        </div>
      )}
      {snackElement}
    </div>
  );
};

export default ListedPlayer;
