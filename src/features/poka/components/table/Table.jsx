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
  const hostPlayerState = useSelector(state =>
    selectHostPlayerState(state, gameId)
  );
  const { snackElement, setSnackInfo } = useSnackBar({ secs: 3, top: true });
  useTable();

  const { playerStates, dealer } = data;
  const isDealing = playerStates.at(-1).playerName;

  useEffect(() => {
    if (!dealer && hostPlayerName !== isDealing) setSnackInfo(<GameInfo />);
  }, [isDealing, hostPlayerName, setSnackInfo, dealer]);

  return (
    <div className={'table players-' + playerStates.length}>
      <div className="game-table">
        <div className="tsoxa" />
      </div>
      <Board />
      <Players />
      {dealer && (dealer === hostPlayerName ? <DealerScreen /> : <Waiting />)}
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
