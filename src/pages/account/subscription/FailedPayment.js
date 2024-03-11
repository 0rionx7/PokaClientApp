import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useRedirectedLoginMutation } from 'features/account/accountApi';
import { socket } from 'features/gameState/gameStateApi';
import Button from 'components/ui/Button';
import './SuccessfulPayment.scss';

const FailedPayment = () => {
  const [redirectedLogin] = useRedirectedLoginMutation();
  let [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const orderCode = searchParams.get('s');

  useEffect(() => {
    socket.on('connect', () => redirectedLogin({ orderCode }));
    return () => {
      socket.removeAllListeners('connect');
    };
  }, [redirectedLogin, orderCode]);

  return (
    <div className="payment-result">
      <section>
        <h1>Η συναλλαγή δεν ολοκληρώθηκε.</h1>
        <p>Δεν έχετε χρεωθεί και δεν έχει ανανεωθεί η συνδρομή σας.</p>
        <p>Παρακαλούμε δοκιμάστε ξανά.</p>
      </section>
      <div className="failed-options">
        <Button
          prompt="Δοκιμάστε ξανα"
          onClick={() => navigate('/account/subscription')}
        />
        <Button
          prompt="Επιστροφή στον λογαριασμό σας"
          onClick={() => navigate('/account')}
        />
      </div>
    </div>
  );
};

export default FailedPayment;
