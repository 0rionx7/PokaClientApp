import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  socket,
  useGetGameStateQuery,
  useSitOutMutation,
} from 'features/gameState/gameStateApi';
import { playerEntry } from 'utils/utilities-functions';
import DealerScreen from 'components/dealer/DealerScreen';
import StayLeave from 'components/action/StayLeave';
import Players from 'components/player/Players';
import GameInfo from 'components/info/GameInfo';
import Waiting from 'components/table/Waiting';
import SitOut from 'components/action/SitOut';
import useSnackBar from 'hooks/useSnackBar';
import Board from 'components/table/Board';
import './Table.scss';

const Table = () => {
  const { gameId } = useParams();
  const { data, refetch } = useGetGameStateQuery(gameId);
  const hostPlayerName = useSelector(state => state.account.username);
  const { snackElement, setSnackInfo } = useSnackBar({ secs: 3, top: true });
  const [sitOut] = useSitOutMutation();

  const hostPlayerState = data.playersStateList.find(
    playerEntry(hostPlayerName)
  );
  const lastAtList = data.playersStateList.at(-1).playerName;

  useEffect(() => {
    return () => sitOut({ gameId });
  }, [gameId, sitOut]);

  useEffect(() => {
    socket.on('connect', () => refetch());
    return () => socket.removeAllListeners('connect');
  }, [refetch]);

  useEffect(() => {
    if (!data.dealer && hostPlayerName !== lastAtList)
      setSnackInfo(<GameInfo />);
  }, [data.dealer, lastAtList, setSnackInfo, hostPlayerName]);

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
      {snackElement}
    </div>
  );
};

export default Table;
