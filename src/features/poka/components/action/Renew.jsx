import RenewOptions from '@poka/components/action/RenewOptions'
import './Renew.scss'

const Renew = () => {
  return (
    <div className="renew">
      <p>Δεν έχετε άλλες μονάδες.Θέλετε να ανανεώσετε;</p>
      <span>Επιλογές ανανέωσης:</span>
      <RenewOptions />
    </div>
  )
}

export default Renew
