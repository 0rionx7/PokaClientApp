import { useActionState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useLoginMutation } from 'features/account/accountApi';
import CheckBox from 'components/ui/CheckBox';
import Button from 'components/ui/Button';
import Frame from 'components/ui/Frame';
import './LoginRegister.scss';

const initialValues = () => {
  let values = { username: '', password: '', rememberMe: false };
  try {
    let username = window.localStorage.getItem('username');
    if (username) {
      values.username = username;
      values.rememberMe = true;
    }
  } catch (error) {
    console.log(error);
  }
  return values;
};

const Login = () => {
  const [formState, formAction, isPending] = useActionState(loginAction, {
    error: null,
    enteredValues: initialValues(),
  });
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  async function loginAction(_prevFormState, formData) {
    const loginData = Object.fromEntries(formData.entries());
    loginData.username = loginData.username.trim();
    try {
      window.localStorage.setItem(
        'username',
        loginData.rememberMe ? loginData.username : ''
      );
    } catch (error) {
      console.log(error);
    }
    const result = await login(loginData);
    if (result?.error?.data)
      return { error: result.error.data, enteredValues: loginData };
    else navigate('/saloon', { replace: true });
  }
  return (
    <div className="login">
      <Frame>
        <form action={formAction}>
          <div className="form-control username">
            <label htmlFor="username">Όνομα χρήστη</label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="on"
              defaultValue={formState.enteredValues?.username}
            />
          </div>
          <CheckBox
            checked={!!formState.enteredValues?.rememberMe}
            name="rememberMe"
            label="να με θυμάσαι"
            style={{ alignSelf: 'flex-end', fontSize: '.8rem' }}
          />
          <div className="form-control password">
            <label htmlFor="password">Κωδικός</label>
            <input
              id="password"
              name="password"
              type="text"
              defaultValue={formState.enteredValues?.password}
            />
          </div>
          <Link to="/forgot">
            <p>Ξέχασα τον κωδικό.</p>
          </Link>
          <span>{formState.error}</span>
          <Button
            type="submit"
            prompt="Είσοδος"
            disabled={isPending}
            className="orange"
          />
        </form>
        <Link to="/register">
          <p>Δεν έχετε λογαρασμό; δημιουργήστε έναν δωρεάν.</p>
        </Link>
      </Frame>
    </div>
  );
};

export default Login;
