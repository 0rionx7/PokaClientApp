import { useActionState, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useLoginMutation } from 'features/account/accountApi';
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
  const [formState, formAction, isPending] = useActionState(
    loginAction,
    initialValues()
  );
  const [error, setError] = useState(null);
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
    if (result?.error?.data) {
      setError(result.error.data);
      return loginData;
    } else navigate('/saloon', { replace: true });
  }

  return (
    <div className="login">
      <Frame>
        <form action={formAction} onFocus={() => setError(null)}>
          <label className="form-control">
            Όνομα χρήστη
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="on"
              defaultValue={formState.username}
            />
          </label>
          <label
            className="form-control"
            style={{ alignSelf: 'flex-end', fontSize: '.8rem' }}>
            να με θυμάσαι
            <input
              type="checkbox"
              className="checkbox"
              name="rememberMe"
              defaultChecked={!!formState.rememberMe}
            />
          </label>
          <label className="form-control">
            Κωδικός
            <input
              id="password"
              name="password"
              type="text"
              defaultValue={formState.password}
            />
          </label>
          <Link to="/forgot">
            <p>Ξέχασα τον κωδικό.</p>
          </Link>
          <span>{error}</span>
          <Button prompt="Είσοδος" disabled={isPending} className="orange" />
        </form>
        <Link to="/register">
          <p>Δεν έχετε λογαρασμό; δημιουργήστε έναν δωρεάν.</p>
        </Link>
      </Frame>
    </div>
  );
};

export default Login;
