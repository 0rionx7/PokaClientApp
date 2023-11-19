import OpenTable from 'pages/saloon/OpenTable';
import AvailableTables from 'pages/saloon/AvailableTables';
import Requests from 'pages/saloon/Requests';
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
