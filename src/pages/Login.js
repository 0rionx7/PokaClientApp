import { useEffect, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';

import { useLoginMutation } from 'features/account/accountApi';
import CheckBox from 'components/ui/CheckBox';
import Button from 'components/ui/Button';
import Frame from 'components/ui/Frame';
import './LoginRegister.scss';
import useSnackBar from 'hooks/useSnackBar';

const Login = () => {
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const { snackElement, setSnackInfo } = useSnackBar({
    height: '100%',
    secs: 5,
  });

  useEffect(() => {
    if (location.state?.to) {
      setSnackInfo(
        'Σας έχει αποσταλλεί στο email που δηλώσατε προσωρινός κωδικός εισόδου.'
      );
    }
  }, [location.state?.to, setSnackInfo]);

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
    try {
      window.localStorage.setItem(
        'username',
        values.rememberMe ? values.username : ''
      );
    } catch (error) {
      console.log(error);
    }
    const result = await login(values);
    if (result?.error?.data) setErrors({ login: result.error.data });
    else navigate(location.state?.to || '/saloon', { replace: true });
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
                label="να με θυμάσαι"
                style={{ alignSelf: 'flex-end', fontSize: '.8rem' }}
              />
              <div className="form-control password">
                <label htmlFor="password">Κωδικός</label>
                <Field id="password" name="password" type="text" />
              </div>
              <Link to="/forgot">
                <p>Ξέχασα τον κωδικό.</p>
              </Link>
              <span>{errors.login}</span>
              <Button
                type="submit"
                prompt="Είσοδος"
                disabled={isSubmitting}
                className="orange"
              />
            </Form>
          )}
        </Formik>
        <Link to="/register">
          <p>Δεν έχετε λογαρασμό; δημιουργήστε έναν δωρεάν.</p>
        </Link>
      </Frame>
      {snackElement}
    </div>
  );
};

export default Login;
