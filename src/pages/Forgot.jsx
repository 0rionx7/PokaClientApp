import { useActionState, useState } from 'react';

import { useForgotPasswordMutation } from 'features/account/accountApi';
import useSnackBar from 'hooks/useSnackBar';
import Button from 'components/ui/Button';
import Frame from 'components/ui/Frame';
import './Forgot.scss';

const Forgot = () => {
  const [reset] = useForgotPasswordMutation();
  const { snackElement, setSnackInfo } = useSnackBar({
    height: '100%',
    secs: 5,
  });
  const [error, setError] = useState(null);
  const [formState, formAction, isPending] =
    useActionState(forgotPasswordAction);

  const validate = email => {
    if (!email) return 'Το email είναι απαραίτητο.';
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email))
      return 'Λάθος διαμόρφοση email.';
  };

  async function forgotPasswordAction(_prevState, formData) {
    const email = formData.get('email').trim();
    const error = validate(email);
    if (error) {
      setError(error);
      return email;
    }
    const result = await reset({ email });
    if (result?.error) {
      setError(result.error.data || 'server error');
      return email;
    }
    setSnackInfo(
      'Σας έχει αποσταλλεί στο email που δηλώσατε σύνδεσμος για την επαναφορά του κωδικού σας.'
    );
  }

  return (
    <div className="forgot">
      <Frame style={{ alignItems: 'center' }}>
        <h3>Αποστολή προσωρινού κωδικού εισόδου</h3>

        <form action={formAction} onFocus={() => setError(null)}>
          <div className="form-control username">
            <label htmlFor="email">Συμπληρώστε το email σας</label>
            <input
              id="email"
              name="email"
              type="text"
              autoComplete="on"
              defaultValue={formState}
            />
          </div>
          <span>{error}</span>
          <Button prompt="Αποστολή" disabled={isPending} className="orange" />
        </form>
      </Frame>
      {snackElement}
    </div>
  );
};

export default Forgot;
