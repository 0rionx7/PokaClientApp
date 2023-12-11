import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  socket,
  useGetGameStateQuery,
  useSitOutMutation,
} from 'features/gameState/gameStateApi';
import { playerEntry } from 'common/utilities-functions';
import DealerScreen from 'components/dealer/DealerScreen';
import StayLeave from 'components/action/StayLeave';
import Players from 'components/player/Players';
import Waiting from 'components/table/Waiting';
import SitOut from 'components/action/SitOut';
import Board from 'components/table/Board';
import './Table.scss';

const Table = () => {
  const { gameId } = useParams();
  const [sitOut] = useSitOutMutation();
  const hostPlayerName = useSelector(state => state.account.username);
  const { data, refetch } = useGetGameStateQuery(gameId);
  const hostPlayerState = data.playersStateList.find(
    playerEntry(hostPlayerName)
  );

  useEffect(() => {
    return () => sitOut({ gameId });
  }, [gameId, sitOut]);

  useEffect(() => {
    socket.on('connect', () => refetch());
    return () => socket.removeAllListeners('connect');
  }, [refetch]);

  return (
    <div className={'table players-' + data.playersStateList.length}>
      <div className="poker-table">
        <div className="tsoxa"></div>
      </div>
      <Board />
      <Players />
      {data.dealer &&
        (data.dealer === hostPlayerName ? <DealerScreen /> : <Waiting />)}
      {hostPlayerState.sittingOut ? <StayLeave /> : <SitOut />}
    </div>
  );
};

export default Table;
