import { useLocation } from 'react-router-dom';

import OpenChineseTable from '@chinese/components/saloon/OpenTable';
import OpenTable from '@poka/components/saloon/OpenTable';
import AvailableTables from '@components/availableTables/AvailableTables';
import UserRequests from '@components/requests/UserRequests';
import './Saloon.scss';

const Saloon = () => {
  const { state } = useLocation();

  return (
    <div className="saloon">
      <div className="player-tables">
        {state.game === 'poka' ? <OpenTable /> : <OpenChineseTable />}
        <UserRequests />
      </div>
      <AvailableTables />
    </div>
  );
};

export default Saloon;
