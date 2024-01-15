import { Link, useNavigate } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';

import { useRegisterMutation } from 'features/account/accountApi';
import Button from 'components/ui/Button';
import Frame from 'components/ui/Frame';

const Register = () => {
  const [register] = useRegisterMutation();
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  };

  const validate = values => {
    let errors = {};
    if (!values.username.trim().length)
      errors.register = 'Το όνομα χρήστη είναι απαραίτητο.';
    if (values.password !== values.confirmPassword)
      errors.register = 'Λάθος επαλήθευση κωδικού.\n';
    if (!values.email.trim()) errors.register = 'Το email είναι απαραίτητο.\n';
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))
      errors.register = 'Λάθος διαμόρφοση email.\n';
    return errors;
  };

  const submitHandler = async (values, { setErrors }) => {
    const result = await register(values);
    if (result?.error?.data?.includes('duplicate'))
      setErrors({
        register: result?.error?.data?.includes('email')
          ? 'Το email είναι ήδη καταχωρημένο.\n'
          : 'Το όνομα χρήστη είναι ήδη καταχωρημένο.\n',
      });
    else if (result?.error?.data) setErrors({ register: result.error.data });
    else navigate('/saloon');
  };

  return (
    <div className="register">
      <Frame>
        <Formik
          key="dealer"
          initialValues={initialValues}
          onSubmit={submitHandler}
          validate={validate}
          validateOnChange={false}
          validateOnBlur={false}
          enableReinitialize>
          {({ isSubmitting, errors, setErrors }) => (
            <Form onFocus={() => setErrors({})}>
              <div className="form-control username">
                <label htmlFor="username">Όνομα χρήστη</label>
                <Field id="username" name="username" type="text" />
              </div>
              <div className="form-control e-mail">
                <label htmlFor="email">Διεύθυνση e-mail</label>
                <Field id="email" name="email" type="text" />
              </div>
              <div className="form-control pass">
                <label htmlFor="password">Κωδικός ασφαλείας</label>
                <Field id="password" name="password" type="text" />
              </div>
              <div className="form-control confirm">
                <label htmlFor="confirmPassword">Επαλήθευση κωδικού</label>
                <Field
                  id="confirmPassword"
                  name="confirmPassword"
                  type="text"
                />
              </div>
              <span>{errors.register}</span>
              <Button
                type="submit"
                prompt="Εγγραφή"
                disabled={isSubmitting}
                className="green"
              />
              <Link to="/login">
                <p>&lt; Σύνδεση</p>
              </Link>
            </Form>
          )}
        </Formik>
      </Frame>
    </div>
  );
};

export default Register;
