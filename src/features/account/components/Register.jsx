import { useActionState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useRegisterMutation } from 'account/api/accountApi';
import Button from 'ui/Button';
import Frame from 'ui/Frame';

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
    if (result?.error?.data)
      return { error: result.error.data, enteredValues: registerData };
    else navigate('/saloon');
  }

  return (
    <div className="register">
      <Frame>
        <form action={formAction}>
          <label className="form-control">
            Όνομα χρήστη
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="on"
              defaultValue={formState.enteredValues?.username}
            />
          </label>
          <label className="form-control">
            Κωδικός ασφαλείας
            <input
              id="password"
              name="password"
              type="text"
              defaultValue={formState.enteredValues?.password}
            />
          </label>
          <label className="form-control">
            Διεύθυνση e-mail
            <input
              id="email"
              name="email"
              type="text"
              autoComplete="on"
              defaultValue={formState.enteredValues?.email}
            />
          </label>
          <label className="form-control">
            Επαλήθευση κωδικού
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="text"
              defaultValue={formState.enteredValues?.confirmPassword}
            />
          </label>
          <span>{formState.error}</span>
          <Button prompt="Εγγραφή" disabled={isPending} className="orange" />
          <label className="form-control agree-terms">
            Συμφωνώ με τους όρους χρήσης
            <input
              type="checkbox"
              className="checkbox"
              id="agree"
              name="agree"
              defaultChecked={!!formState.enteredValues?.agree}
            />
          </label>
        </form>
      </Frame>
    </div>
  );
};

export default Register;
