import { useNavigate, useSearchParams } from 'react-router-dom'

import Button from '@ui/Button'
import useRelogin from '@hooks/useLoginOnConnect'
import './SuccessfulPayment.scss'

const SuccessfulPayment = () => {
  let [searchParams] = useSearchParams()
  const transactionId = searchParams.get('t')
  const orderCode = searchParams.get('s')
  const navigate = useNavigate()
  useRelogin({ orderCode })

  return (
    <div className="payment-result">
      <section>
        <h1>Ευχαριστούμε πολύ!</h1>
        <p>Αριθμός συναλλαγής: {transactionId}</p>
        <p>Απόδειξη της συναλλαγής σας έχει αποσταλεί στο email που έχετε δηλώσει.</p>
      </section>
      <Button prompt="Επιστροφή στον λογαριασμό σας." onClick={() => navigate('/account')} />
    </div>
  )
}

export default SuccessfulPayment
