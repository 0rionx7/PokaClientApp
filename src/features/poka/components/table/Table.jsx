import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  useGetPokaStateQuery,
  useSitDownMutation,
  useSitOutMutation,
} from '@poka/api/pokaApi';
import { resetMessages, selectUserName } from '@account/slice/accountSlice';
import { getPlayerState } from '@utils/helper-functions';
import DealerScreen from '@poka/components/dealer/DealerScreen';
import StayLeave from '@components/sitOut/StayLeave';
import Players from '@poka/components/player/Players';
import GameInfo from '@poka/components/info/GameInfo';
import Waiting from '@poka/components/table/Waiting';
import SitOut from '@components/sitOut/SitOut';
import useSnackBar from '@hooks/useSnackBar';
import Board from '@poka/components/table/Board';
import { socket } from '@store/gameApi';
import './Table.scss';

const Table = () => {
  const { gameId } = useParams();
  const { data, refetch } = useGetPokaStateQuery(gameId);
  const hostPlayerName = useSelector(selectUserName);
  const { snackElement, setSnackInfo } = useSnackBar({ secs: 3, top: true });
  const [sitOut] = useSitOutMutation();
  const dispatch = useDispatch();

  const hostPlayerState = data.playerStates.find(
    getPlayerState(hostPlayerName)
  );
  const dealer = data.playerStates.at(-1).playerName;

  useEffect(() => {
    if (!data.dealer && hostPlayerName !== dealer) setSnackInfo(<GameInfo />);
  }, [data.dealer, hostPlayerName, dealer, setSnackInfo]);

  useEffect(() => {
    return () => {
      dispatch(resetMessages());
      sitOut({ gameId });
    };
  }, [gameId, sitOut, dispatch]);

  useEffect(() => {
    socket.on('connect', () => refetch());
    return () => socket.removeAllListeners('connect');
  }, [refetch]);

  if (!data) return null;

  return (
    <div className={'table players-' + data.playerStates.length}>
      <div className="game-table">
        <div className="tsoxa" />
      </div>
      <Board />
      <Players />
      {data.dealer &&
        (data.dealer === hostPlayerName ? <DealerScreen /> : <Waiting />)}
      {hostPlayerState.sittingOut ? (
        <StayLeave useSitDown={useSitDownMutation} />
      ) : (
        <SitOut />
      )}
      {snackElement}
    </div>
  );
};

export default Table;
