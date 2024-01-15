import { useState, useEffect } from 'react';
import { Field, Form, Formik } from 'formik';

import { useChangePasswordMutation } from 'features/account/accountApi';
import { editSvg } from 'assets/svgs/various';
import Button from 'components/ui/Button';
import classes from './UserName.module.scss';

const EditPassword = () => {
  const [edit, setEdit] = useState(false);
  const [changePassword, { isLoading, isSuccess, reset }] =
    useChangePasswordMutation();

  useEffect(() => {
    if (!edit) reset();
  }, [edit, reset]);

  if (!edit)
    return (
      <div className={classes['flex-center']} style={{ height: '2.2rem' }}>
        *********
        <div onClick={() => setEdit(!edit)} className={classes['edit-btn']}>
          {editSvg} Αλλαγή κωδικού.
        </div>
      </div>
    );

  const initialValues = {
    currentPassword: '',
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
      setTimeout(() => setEdit(false), 1000);
    }
  };

  return (
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
            <div className="form-control">
              <label htmlFor="currentPassword">Τρέχων κωδικός</label>
              <Field id="currentPassword" name="currentPassword" type="text" />
            </div>
            <div className="form-control">
              <label htmlFor="newPassword">Νέος κωδικός</label>
              <Field id="newPassword" name="newPassword" type="text" />
            </div>
            <div className="form-control">
              <label htmlFor="confirmPassword">Επαλήθευση κωδικού</label>
              <Field id="confirmPassword" name="confirmPassword" type="text" />
            </div>
            <span style={{ color: 'red' }}>{errors?.password}</span>
            <span style={{ color: '#1cf31c' }}>{status?.success}</span>
          </Form>
          <Button
            prompt="Υποβολή"
            onClick={submitForm}
            disabled={isLoading || isSuccess}
            className={classes['confirm-btn'] + ' green'}
          />
          <Button
            prompt="X"
            className={classes['cancel-btn'] + ' red'}
            onClick={() => setEdit(false)}
          />
        </>
      )}
    </Formik>
  );
};

export default EditPassword;
