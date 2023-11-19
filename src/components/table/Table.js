import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useSitOutMutation } from 'src/features/gameApi/gameStateMutations/useSitOutMutation';
import { socket, useGetGameStateQuery } from 'src/features/gameApi/gameApi';
import DealerScreen from 'src/components/dealer/DealerScreen';
import { playerEntry } from 'src/common/utilities-functions';
import StayLeave from 'src/components/action/StayLeave';
import Players from 'src/components/player/Players';
import Waiting from 'src/components/table/Waiting';
import SitOut from 'src/components/action/SitOut';
import Board from 'src/components/table/Board';
import './Table.scss';

const Table = () => {
  const { gameId } = useParams();
  const [sitOut] = useSitOutMutation();
  const hostPlayerName = useSelector(state => state.auth.username);
  const { dealer, playersCount, hostPlayerState, refetch } =
    useGetGameStateQuery(gameId, {
      selectFromResult: ({ data }) => ({
        dealer: data.dealer,
        playersCount: data.playersStateList.length,
        hostPlayerState: data.playersStateList.find(
          playerEntry(hostPlayerName)
        ),
      }),
    });

  useEffect(() => {
    return () => sitOut();
  }, [sitOut]);

  useEffect(() => {
    socket.on('connect', refetch);
    return () => socket.removeAllListeners('connect');
  }, [refetch]);

  return (
    <div className={'table players-' + playersCount}>
      <div className="poker-table">
        <div className="tsoxa"></div>
      </div>
      <Board />
      <Players />
      {dealer && (dealer === hostPlayerName ? <DealerScreen /> : <Waiting />)}
      {hostPlayerState.sittingOut ? <StayLeave /> : <SitOut />}
    </div>
  );
};

export default Table;
