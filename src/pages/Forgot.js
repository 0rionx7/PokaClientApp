import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';

import { useForgotPasswordMutation } from 'features/account/accountApi';
import Button from 'components/ui/Button';
import Frame from 'components/ui/Frame';
import './Forgot.scss';

const Forgot = () => {
  const [reset] = useForgotPasswordMutation();
  const navigate = useNavigate();

  const validate = values => {
    let errors = {};
    if (!values.email.trim()) errors.email = 'Το email είναι απαραίτητο.\n';
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))
      errors.email = 'Λάθος διαμόρφοση email.\n';
    return errors;
  };

  const submitHandler = async (values, { setErrors }) => {
    const result = await reset({ email: values.email.trim() });
    if (result?.error?.data) setErrors({ email: result.error.data });
    else
      navigate('/login', {
        state: { to: '/account/resetPassword' },
        replace: true,
      });
  };

  return (
    <div className="forgot">
      <Frame style={{ alignItems: 'center' }}>
        <h3>Αποστολή προσωρινού κωδικού εισόδου</h3>
        <Formik
          key="forgot"
          initialValues={{ email: '' }}
          validate={validate}
          onSubmit={submitHandler}
          validateOnChange={false}
          validateOnBlur={false}
          enableReinitialize>
          {({ isSubmitting, errors, setErrors }) => (
            <Form onFocus={() => setErrors({})}>
              <div className="form-control username">
                <label htmlFor="email">Συμπληρώστε το email σας</label>
                <Field id="email" name="email" type="text" />
              </div>
              <span>{errors.email}</span>
              <Button
                type="submit"
                prompt="Αποστολή"
                disabled={isSubmitting}
                className="orange"
              />
            </Form>
          )}
        </Formik>
      </Frame>
    </div>
  );
};

export default Forgot;
