import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  socket,
  useGetGameStateQuery,
  useSitOutMutation,
} from 'features/gameState/gameStateApi';
import { selectPlayername } from 'features/account/accountSlice';
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
  const hostPlayerName = useSelector(selectPlayername);
  const { snackElement, setSnackInfo } = useSnackBar({ secs: 3, top: true });
  const [sitOut] = useSitOutMutation();
  const [prevDealer, setPrevDealer] = useState(data.dealer);

  const hostPlayerState = data.playersStateList.find(
    playerEntry(hostPlayerName)
  );
  const lastAtList = data.playersStateList.at(-1).playerName;
  if (data.dealer !== prevDealer) {
    setPrevDealer(data.dealer);
    if (!data.dealer && hostPlayerName !== lastAtList)
      setSnackInfo(<GameInfo />);
  }

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
        <div className="tsoxa" />
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
