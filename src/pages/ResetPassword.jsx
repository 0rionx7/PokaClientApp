import { useActionState, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useChangePasswordMutation } from 'features/account/accountApi';
import useLoginOnConnect from 'hooks/useLoginOnConnect';
import Button from 'components/ui/Button';
import Frame from 'components/ui/Frame';

const ResetPassword = () => {
  const [changePassword, { isLoading, isSuccess }] =
    useChangePasswordMutation();
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const token = searchParams.get('t');
  useLoginOnConnect({ token });
  const [formState, formAction, isPending] = useActionState(
    resetPasswordAction,
    ''
  );
  const [error, setError] = useState(null);

  const validate = values => {
    if (values.newPassword !== values.confirmPassword)
      return 'Λάθος επαλήθευση κωδικού.';
  };
  async function resetPasswordAction(_prevState, formData) {
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
    setTimeout(() => navigate('/account'), 1000);
    return { success: 'Επιτυχής αλλαγή κωδικού.' };
  }

  return (
    <div className="change-password">
      <Frame>
        <>
          <form action={formAction} onFocus={() => setError(null)}>
            <h3>Δημιουργία νέου κωδικού εισόδου</h3>
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
            <span style={{ color: 'red' }}>{error}</span>
            <span style={{ color: '#1cf31c' }}>{formState.success}</span>
            <Button
              prompt="Υποβολή"
              disabled={isLoading || isSuccess || isPending}
              className=" green"
            />
          </form>
        </>
      </Frame>
    </div>
  );
};

export default ResetPassword;
