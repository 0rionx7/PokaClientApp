import { useNavigate } from 'react-router-dom';

import { useGetUserQuery } from 'features/authSlice/authApi';
import Button from 'components/ui/Button';
import classes from './UserName.module.scss';

const UserSubscription = () => {
  const navigate = useNavigate();
  const { subExpiration } = useGetUserQuery(undefined, {
    selectFromResult: ({ data }) => ({
      subExpiration: data?.subExpiration,
    }),
  });

  if (!subExpiration || new Date(subExpiration) <= Date.now())
    return <div>Δέν έχετε ενεργή συνδρομή.</div>;

  const expiresAt = new Date(subExpiration).toLocaleDateString('el-GR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div
      className={classes['flex-center'] + ' ' + classes['user-subscription']}>
      Λήξη: {expiresAt}
      <Button
        className="orange"
        prompt="Ανανέωση"
        onClick={() => navigate('subscription')}
      />
    </div>
  );
};

export default UserSubscription;
