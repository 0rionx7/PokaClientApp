import AvailableTables from '@components/availableTables/AvailableTables';
import OpenTable from './OpenTable';
import UserRequests from '@components/requests/UserRequests';

const ChineseSaloon = () => {
  return (
    <div className="saloon">
      <div className="player-tables">
        <OpenTable />
        <UserRequests game={'chinese'} />
      </div>
      <AvailableTables game={'chinese'} />
    </div>
  );
};

export default ChineseSaloon;
