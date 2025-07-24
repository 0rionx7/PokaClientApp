import { useActionState, useState } from 'react';

import { useUsernameChangeMutation } from 'features/account/accountApi';
import Button from 'components/ui/Button';
import classes from './UserName.module.scss';

const EditUsername = ({ stopEditing }) => {
  const [changeUsername] = useUsernameChangeMutation();
  const [error, setError] = useState(null);
  const [formState, formAction, isPending] = useActionState(
    editUserNameAction,
    ''
  );

  const validate = userName => {
    if (userName.length < 3 || userName.length > 17)
      return `Το όνομα χρήστη πρέπει να αποτελείται\n από 2 εώς 17 χαρακτήρες.`;
  };
  async function editUserNameAction(_prevFormState, formData) {
    const newUserName = formData.get('username').trim();
    const error = validate(newUserName);
    if (error) {
      setError(error);
      return newUserName;
    }
    const result = await changeUsername({
      username: newUserName,
    });
    if (result?.error?.data) {
      setError(result.error.data);
      return newUserName;
    } else stopEditing();
  }

  return (
    <form
      className={classes['flex-center']}
      action={formAction}
      onFocus={() => setError(null)}>
      <div className="form-control">
        <label htmlFor="username">{error ? '' : 'Νέο όνομα χρήστη'}</label>
        <input
          id="username"
          name="username"
          type="text"
          defaultValue={formState}
        />
      </div>
      <div className={classes.error}>{error}</div>
      <Button
        type="submit"
        prompt="Aποθήκευση"
        disabled={isPending}
        className={classes['confirm-btn'] + ' green'}
      />
      <Button
        prompt="X"
        className={classes['cancel-btn'] + ' red'}
        onClick={stopEditing}
      />
    </form>
  );
};

export default EditUsername;
