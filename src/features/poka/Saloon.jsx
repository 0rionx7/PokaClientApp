import OpenTable from '@poka/components/saloon/OpenTable';
import AvailableTables from '@components/saloon/AvailableTables';
import Requests from '@poka/components/saloon/Requests';
import './Saloon.scss';

const Saloon = () => {
  return (
    <div className="saloon">
      <div className="player-tables">
        <OpenTable />
        <Requests />
      </div>
      <AvailableTables game="poka" />
    </div>
  );
};

export default Saloon;
