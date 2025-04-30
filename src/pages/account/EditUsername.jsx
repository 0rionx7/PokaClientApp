import { useSelector } from 'react-redux';
import { Field, Form, Formik } from 'formik';

import { useUsernameChangeMutation } from 'features/account/accountApi';
import { selectPlayername } from 'features/account/accountSlice';
import Button from 'components/ui/Button';
import classes from './UserName.module.scss';

const EditUsername = ({ stopEditing }) => {
  const playerName = useSelector(selectPlayername);
  const [changeUsername] = useUsernameChangeMutation();

  const validate = values => {
    if (values.username.trim().length < 3 || values.username.trim().length > 17)
      return {
        username: `Το όνομα χρήστη πρέπει να αποτελείται\n από 2 εώς 17 χαρακτήρες.`,
      };
  };
  const submitHandler = async (values, { setErrors }) => {
    const result = await changeUsername({
      username: values.username.trim(),
    });
    if (result?.error?.data === 'duplicate username')
      setErrors({ username: 'Το όνομα χρήστη είναι ήδη καταχωρημένο.' });
    else if (result?.error?.data) setErrors({ username: result.error.data });
    else stopEditing();
  };

  return (
    <Formik
      key="username"
      initialValues={{ username: playerName }}
      onSubmit={submitHandler}
      validate={validate}
      validateOnChange={false}
      validateOnBlur={false}
      enableReinitialize>
      {({ setErrors, errors, isSubmitting }) => (
        <Form className={classes['flex-center']}>
          <div className="form-control" onFocus={() => setErrors({})}>
            <label htmlFor="username">
              {errors.username ? '' : 'Νέο όνομα χρήστη'}
            </label>
            <Field id="username" name="username" type="text" />
          </div>
          <div className={classes.error}>{errors.username}</div>
          <Button
            type="submit"
            prompt="Aποθήκευση"
            disabled={isSubmitting}
            className={classes['confirm-btn'] + ' green'}
          />
          <Button
            prompt="X"
            className={classes['cancel-btn'] + ' red'}
            onClick={stopEditing}
          />
        </Form>
      )}
    </Formik>
  );
};

export default EditUsername;
