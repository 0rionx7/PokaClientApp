import OpenTable from '@poka/components/saloon/OpenTable';
import AvailableTables from '@components/availableTables/AvailableTables';
import UserRequests from '@components/requests/UserRequests';
import './Saloon.scss';

const Saloon = () => {
  return (
    <div className="saloon">
      <div className="player-tables">
        <OpenTable />
        <UserRequests game="poka" />
      </div>
      <AvailableTables game="poka" />
    </div>
  );
};

export default Saloon;
