import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useRedirectedLoginMutation } from 'features/authSlice/authApi';
import { socket } from 'features/gameApi/gameApi';
import Button from 'components/ui/Button';
import './SuccessfulPayment.scss';

const SuccessfulPayment = () => {
  const [redirectionalLogin] = useRedirectedLoginMutation();
  let [searchParams] = useSearchParams();
  const transactionId = searchParams.get('t');
  const orderCode = searchParams.get('s');
  const navigate = useNavigate();

  useEffect(() => {
    socket.on('connect', () => redirectionalLogin(orderCode));
    return () => {
      socket.removeAllListeners('connect');
    };
  }, [redirectionalLogin, orderCode]);

  return (
    <div className="payment-result">
      <section>
        <h1>Ευχαριστούμε πολύ!</h1>
        <p>Αριθμός συναλλαγής: {transactionId}</p>
        <p>
          Απόδειξη της συναλλαγής σας έχει αποσταλεί στο email που έχετε
          δηλώσει.
        </p>
      </section>
      <Button
        prompt="Επιστροφή στον λογαριασμό σας."
        onClick={() => navigate('/account')}
      />
    </div>
  );
};

export default SuccessfulPayment;
