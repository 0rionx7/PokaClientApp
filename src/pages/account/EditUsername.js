import { useSelector } from 'react-redux';
import { Field, Form, Formik } from 'formik';

import { useUsernameChangeMutation } from 'features/account/accountApi';
import Button from 'components/ui/Button';
import classes from './UserName.module.scss';

const EditUsername = ({ stopEditing }) => {
  const playerName = useSelector(state => state.account.username);
  const [changeUsername] = useUsernameChangeMutation();

  const validate = values => {
    if (values.username.trim().length < 2)
      return {
        username: 'Εισάγετε τουλάχιστων 2 χαρακτήρες.',
      };
  };
  const submitHandler = async (values, { setErrors }) => {
    const result = await changeUsername({
      username: values.username.trim(),
    });
    if (result?.error?.data === 'duplicate')
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
