import { useNavigate } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';

import { useChangePasswordMutation } from 'features/account/accountApi';
import Button from 'components/ui/Button';
import Frame from 'components/ui/Frame';

const ResetPassword = () => {
  const [changePassword, { isLoading, isSuccess }] =
    useChangePasswordMutation();
  const navigate = useNavigate();

  const initialValues = {
    newPassword: '',
    confirmPassword: '',
  };
  const validate = values => {
    if (values.newPassword !== values.confirmPassword)
      return { password: 'Λάθος επαλήθευση κωδικού.' };
  };
  const submitHandler = async (values, { setErrors, setStatus }) => {
    const result = await changePassword(values);
    if (result.error) setErrors({ password: result.error.data });
    else {
      setStatus({ success: 'Επιτυχής αλλαγή κωδικού.' });
      setTimeout(() => navigate('/account'), 1000);
    }
  };

  return (
    <div className="change-password">
      <Frame>
        <Formik
          key="password"
          initialValues={initialValues}
          onSubmit={submitHandler}
          validate={validate}
          validateOnChange={false}
          validateOnBlur={false}
          enableReinitialize>
          {({ setErrors, submitForm, errors, status }) => (
            <>
              <Form onFocus={() => setErrors({})}>
                <h3>Δημιουργία νέου κωδικού εισόδου</h3>
                <div className="form-control">
                  <label htmlFor="newPassword">Νέος κωδικός</label>
                  <Field id="newPassword" name="newPassword" type="text" />
                </div>
                <div className="form-control">
                  <label htmlFor="confirmPassword">Επαλήθευση κωδικού</label>
                  <Field
                    id="confirmPassword"
                    name="confirmPassword"
                    type="text"
                  />
                </div>
                <span style={{ color: 'red' }}>{errors?.password}</span>
                <span style={{ color: '#1cf31c' }}>{status?.success}</span>
              </Form>
              <Button
                prompt="Υποβολή"
                onClick={submitForm}
                disabled={isLoading || isSuccess}
                className=" green"
              />
            </>
          )}
        </Formik>
      </Frame>
    </div>
  );
};

export default ResetPassword;
