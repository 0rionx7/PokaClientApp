import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';

import { useLoginMutation } from 'features/authSlice/authApi';
import Button from 'components/ui/Button';
import Frame from 'components/ui/Frame';
import CheckBox from 'components/ui/CheckBox';
import './LoginRegister.scss';

const Login = () => {
  const [username, setUsername] = useState('');
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!username) return;
    try {
      username === 'remove'
        ? window.localStorage.removeItem('username')
        : window.localStorage.setItem('username', username);
    } catch (error) {
      console.log(error);
    }
  }, [username]);

  const initialValues = useMemo(() => {
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
  }, []);

  const submitHandler = async (values, { setErrors }) => {
    values.username = values.username.trim();
    if (values.username && values.rememberMe) setUsername(values.username);
    else if (!values.rememberMe) setUsername('remove');

    const result = await login(values);
    if (result?.error?.data) setErrors({ login: result.error.data });
    else navigate('/saloon');
  };

  return (
    <div className="login">
      <Frame>
        <Formik
          key="login"
          initialValues={initialValues}
          onSubmit={submitHandler}
          validateOnChange={false}
          validateOnBlur={false}
          enableReinitialize>
          {({ values, isSubmitting, errors, setErrors }) => (
            <Form onFocus={() => setErrors({})}>
              <div className="form-control username">
                <label htmlFor="username">Όνομα χρήστη</label>
                <Field id="username" name="username" type="text" />
              </div>
              <CheckBox
                checked={values.rememberMe}
                name="rememberMe"
                label="να με θυμάσε"
                style={{ alignSelf: 'flex-end', fontSize: '.8rem' }}
              />
              <div className="form-control password">
                <label htmlFor="password">Κωδικός</label>
                <Field id="password" name="password" type="text" />
              </div>
              <span>{errors.login}</span>
              <Button
                type="submit"
                prompt="Είσοδος"
                disabled={isSubmitting}
                className="green"
              />
            </Form>
          )}
        </Formik>
        <Link to="/register">
          <p>Δεν έχετε λογαρασμό; δημιουργήστε έναν δωρεάν.</p>
        </Link>
      </Frame>
    </div>
  );
};

export default Login;
