import OpenTable from 'src/pages/saloon/OpenTable';
import AvailableTables from 'src/pages/saloon/AvailableTables';
import Requests from 'src/pages/saloon/Requests';
import './Saloon.scss';

const Saloon = () => {
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

export default Saloon;
