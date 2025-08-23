import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  selectHostPlayerState,
  useGetPokaStateQuery,
  useSitDownMutation,
} from '@poka/api/pokaApi';
import { selectUserName } from '@account/api/accountApi';
import DealerScreen from '@poka/components/dealer/DealerScreen';
import StayLeave from '@components/sitOut/StayLeave';
import GameInfo from '@poka/components/info/GameInfo';
import Players from '@poka/components/player/Players';
import Waiting from '@poka/components/table/Waiting';
import SitOut from '@components/sitOut/SitOut';
import Board from '@poka/components/table/Board';
import useSnackBar from '@hooks/useSnackBar';
import useTable from '@poka/hooks/useTable';
import './Table.scss';

const Table = () => {
  const { gameId } = useParams();
  const { data } = useGetPokaStateQuery(gameId);
  const hostPlayerName = useSelector(selectUserName);
  const hostPlayerState = useSelector(selectHostPlayerState(gameId));
  const { snackElement, setSnackInfo } = useSnackBar({ secs: 3, top: true });
  useTable();

  const dealer = data?.playerStates?.at(-1)?.playerName;

  useEffect(() => {
    if (!data.dealer && hostPlayerName !== dealer) setSnackInfo(<GameInfo />);
  }, [dealer, hostPlayerName, setSnackInfo, data.dealer]);

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
