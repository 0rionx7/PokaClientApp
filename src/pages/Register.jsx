import { useNavigate } from 'react-router-dom';

import { useRegisterMutation } from 'features/account/accountApi';
import Button from 'components/ui/Button';
import Frame from 'components/ui/Frame';
import { useActionState } from 'react';

const Register = () => {
  const [formState, formAction, isPending] = useActionState(registerAction, {
    error: null,
  });
  const [register] = useRegisterMutation();
  const navigate = useNavigate();

  function validate(values) {
    let errors = {};
    if (!values.agree)
      errors.register = 'Πρέπει να συμφωνήσετε με τους όρους χρήσης.';
    if (values.username.trim().length < 3 || values.username.trim().length > 17)
      return {
        register: `Το όνομα χρήστη πρέπει να αποτελείται\n από 2 εώς 17 χαρακτήρες.`,
      };
    if (values.password !== values.confirmPassword)
      errors.register = 'Λάθος επαλήθευση κωδικού.\n';
    if (!values.email.trim()) errors.register = 'Το email είναι απαραίτητο.\n';
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))
      errors.register = 'Λάθος διαμόρφοση email.\n';
    return errors;
  }

  async function registerAction(_prevFormState, formData) {
    const registerData = Object.fromEntries(formData.entries());
    const error = validate(registerData);
    if (error.register)
      return { error: error.register, enteredValues: registerData };

    const result = await register(registerData);
    if (result?.error?.data?.includes('duplicate')) {
      const error = result?.error?.data?.includes('email')
        ? 'Το email είναι ήδη καταχωρημένο.\n'
        : 'Το όνομα χρήστη είναι ήδη καταχωρημένο.\n';
      return { error, enteredValues: registerData };
    } else if (result?.error?.data)
      return { error: result.error.data, enteredValues: registerData };
    else navigate('/saloon');
  }

  return (
    <div className="register">
      <Frame>
        <form action={formAction}>
          <div className="form-control">
            <label htmlFor="username">Όνομα χρήστη</label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="on"
              defaultValue={formState.enteredValues?.username}
            />
          </div>
          <div className="form-control">
            <label htmlFor="password">Κωδικός ασφαλείας</label>
            <input
              id="password"
              name="password"
              type="text"
              defaultValue={formState.enteredValues?.password}
            />
          </div>
          <div className="form-control">
            <label htmlFor="email">Διεύθυνση e-mail</label>
            <input
              id="email"
              name="email"
              type="text"
              autoComplete="on"
              defaultValue={formState.enteredValues?.email}
            />
          </div>
          <div className="form-control">
            <label htmlFor="confirmPassword">Επαλήθευση κωδικού</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="text"
              defaultValue={formState.enteredValues?.confirmPassword}
            />
          </div>
          <span>{formState.error}</span>
          <Button
            type="submit"
            prompt="Εγγραφή"
            disabled={isPending}
            className="orange"
          />
          <div className="form-control agree-terms">
            <label htmlFor="agree">Συμφωνώ με τους όρους χρήσης</label>
            <input
              type="checkbox"
              className="checkbox"
              id="agree"
              name="agree"
              defaultChecked={!!formState.enteredValues?.agree}
            />
          </div>
        </form>
      </Frame>
    </div>
  );
};

export default Register;
