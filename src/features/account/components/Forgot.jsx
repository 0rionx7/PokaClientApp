import { useState } from 'react';

import { useForgotPasswordMutation } from 'account/api/accountApi';
import useSnackBar from 'hooks/useSnackBar';
import Button from 'ui/Button';
import Frame from 'ui/Frame';
import './Forgot.scss';

const Forgot = () => {
  const [reset] = useForgotPasswordMutation();
  const { snackElement, setSnackInfo } = useSnackBar({
    height: '100%',
    secs: 5,
  });
  const [status, setStatus] = useState({});
  const [enteredEmail, setEnteredEmail] = useState('');

  const validate = email => {
    if (!email) return 'Το email είναι απαραίτητο.';
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email))
      return 'Λάθος διαμόρφοση email.';
  };

  async function handleSubmitEmail(e) {
    e.preventDefault();
    setStatus({ pending: true });
    const error = validate(enteredEmail);
    if (error) return setStatus({ error });
    const result = await reset({ email: enteredEmail });
    if (result.error?.data)
      return setStatus({ error: result.error.data || 'server error' });
    setSnackInfo(
      'Σας έχει αποσταλλεί στο email που δηλώσατε σύνδεσμος για την επαναφορά του κωδικού σας.'
    );
    setStatus({});
  }

  return (
    <div className="forgot">
      <Frame style={{ alignItems: 'center' }}>
        <h3>Αποστολή προσωρινού κωδικού εισόδου</h3>
        <form onSubmit={handleSubmitEmail} onFocus={() => setStatus({})}>
          <div className="form-control username">
            <label htmlFor="email">Συμπληρώστε το email σας</label>
            <input
              id="email"
              name="email"
              type="text"
              autoComplete="on"
              value={enteredEmail}
              onChange={e => setEnteredEmail(e.target.value)}
            />
          </div>
          <span>{status.error}</span>
          <Button
            prompt="Αποστολή"
            disabled={status.pending}
            className="orange"
          />
        </form>
      </Frame>
      {snackElement}
    </div>
  );
};

export default Forgot;
