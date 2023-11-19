import RenewOptions from 'components/action/RenewOptions';
import Overlay from 'components/ui/Overlay';
import './Renew.scss';

const Renew = () => {
  return (
    <>
      <Overlay />
      <div className="renew">
        <p>Δεν έχετε άλλες μονάδες.Θέλετε να ανανεώσετε;</p>
        <span>Επιλογές ανανέωσης:</span>
        <RenewOptions />
      </div>
    </>
  );
};

export default Renew;
