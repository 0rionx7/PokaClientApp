import { useSelector } from 'react-redux';

import {
  selectHostPlayerState,
  useGetPokaStateQuery,
  useSitDownMutation,
} from '@poka/api/pokaApi';
import { selectUserName } from '@account/api/accountApi';
import DealerScreen from '@poka/components/dealer/DealerScreen';
import StayLeave from '@components/sitOut/StayLeave';
import Players from '@poka/components/player/Players';
import Waiting from '@poka/components/table/Waiting';
import SitOut from '@components/sitOut/SitOut';
import Board from '@poka/components/table/Board';
import useTable from '@poka/hooks/useTable';
import './Table.scss';
import './Chip.scss';

const Table = () => {
  const { data } = useGetPokaStateQuery();
  const hostPlayerName = useSelector(selectUserName);
  const hostPlayerState = useSelector(selectHostPlayerState);
  const snackElement = useTable();

  const { playerStates, dealer } = data;

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
