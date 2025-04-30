import AvailableTables from './AvailableTables';
import OpenTable from './OpenTable';
import Requests from './Requests';

const ChineseSaloon = () => {
  return (
    <div className="saloon">
      <div className="player-tables">
        <OpenTable />
        <Requests />
      </div>
      <AvailableTables />
    </div>
  );
};

export default ChineseSaloon;
