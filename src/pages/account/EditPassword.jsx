import { useState, useActionState, useEffect } from 'react';

import { useChangePasswordMutation } from 'features/account/accountApi';
import { editSvg } from 'assets/svgs/various';
import Button from 'components/ui/Button';
import classes from './UserName.module.scss';

const initialValues = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};

const EditPassword = () => {
  const [edit, setEdit] = useState(false);
  const [changePassword, { isLoading, isSuccess, reset }] =
    useChangePasswordMutation();
  const [error, setError] = useState(null);
  const [formState, formAction, isPending] = useActionState(
    editPasswordAction,
    initialValues
  );
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

  const validate = values => {
    if (values.newPassword !== values.confirmPassword)
      return 'Λάθος επαλήθευση κωδικού.';
  };
  async function editPasswordAction(_prevState, formData) {
    const passwordData = Object.fromEntries(formData.entries());
    const error = validate(passwordData);
    if (error) {
      setError(error);
      return passwordData;
    }
    const result = await changePassword(passwordData);
    if (result.error) {
      setError(result.error.data);
      return passwordData;
    }
    setTimeout(() => setEdit(false), 1000);
    return { success: 'Επιτυχής αλλαγή κωδικού.' };
  }

  return (
    <>
      <form
        id="editForm"
        action={formAction}
        onFocus={() => setError(null)}
        className={classes['edit-form']}>
        <div className="form-control">
          <label htmlFor="currentPassword">Τρέχων κωδικός</label>
          <input
            id="currentPassword"
            name="currentPassword"
            type="text"
            defaultValue={formState.currentPassword}
          />
        </div>
        <div className="form-control">
          <label htmlFor="newPassword">Νέος κωδικός</label>
          <input
            id="newPassword"
            name="newPassword"
            type="text"
            defaultValue={formState.newPassword}
          />
        </div>
        <div className="form-control">
          <label htmlFor="confirmPassword">Επαλήθευση κωδικού</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="text"
            defaultValue={formState.confirmPassword}
          />
        </div>
        <div className={classes.error} style={{ margin: 0 }}>
          {error}
        </div>
        {isSuccess && (
          <span style={{ color: '#1cf31c' }}>{formState.success}</span>
        )}
      </form>
      <Button
        form="editForm"
        prompt="Υποβολή"
        disabled={isPending || isLoading || isSuccess}
        className={classes['confirm-btn'] + ' green'}
      />
      <Button
        prompt="X"
        className={classes['cancel-btn'] + ' red'}
        onClick={() => setEdit(false)}
      />
    </>
  );
};

export default EditPassword;
