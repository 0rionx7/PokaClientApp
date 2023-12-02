import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  gameApi,
  socket,
  useGetGameStateQuery,
  useSitOutMutation,
} from 'features/gameStateSlice/gameApi';
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
  const dispatch = useDispatch();
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
    return () => {
      sitOut({ gameId });
      dispatch(gameApi.util.resetApiState());
    };
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
