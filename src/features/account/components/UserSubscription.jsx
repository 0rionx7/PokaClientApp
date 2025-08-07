import { useNavigate } from 'react-router-dom';

import { useGetUserQuery } from 'account/api/accountApi';
import Button from 'ui/Button';
import classes from './UserName.module.scss';

const UserSubscription = () => {
  const navigate = useNavigate();
  const { data } = useGetUserQuery(undefined);

  const isExpired =
    !data?.subExpiration || new Date(data?.subExpiration) <= Date.now();

  const expiresAt = new Date(data?.subExpiration).toLocaleDateString('el-GR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div
      className={classes['flex-center'] + ' ' + classes['user-subscription']}>
      {isExpired ? (
        <div>Δέν έχετε ενεργή συνδρομή.</div>
      ) : (
        <div>Λήξη: {expiresAt}</div>
      )}
      <Button
        className="orange"
        prompt="Ανανέωση"
        onClick={() => navigate('subscription')}
      />
    </div>
  );
};

export default UserSubscription;
