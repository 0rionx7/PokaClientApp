import { useNavigate } from 'react-router-dom';
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
    agree: false,
  };

  const validate = values => {
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
          {({ values, isSubmitting, errors, setErrors }) => (
            <Form onFocus={() => setErrors({})}>
              <div className="form-control">
                <label htmlFor="username">Όνομα χρήστη</label>
                <Field id="username" name="username" type="text" />
              </div>
              <div className="form-control">
                <label htmlFor="password">Κωδικός ασφαλείας</label>
                <Field id="password" name="password" type="text" />
              </div>
              <div className="form-control">
                <label htmlFor="email">Διεύθυνση e-mail</label>
                <Field id="email" name="email" type="text" />
              </div>
              <div className="form-control">
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
                className="orange"
              />
              <div className="form-control agree-terms">
                <label>Συμφωνώ με τους όρους χρήσης</label>
                <Field
                  type="checkbox"
                  className="checkbox"
                  name="agree"
                  checked={values.agree}
                />
              </div>
            </Form>
          )}
        </Formik>
      </Frame>
    </div>
  );
};

export default Register;
