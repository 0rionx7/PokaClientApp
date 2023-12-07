import { accountApi } from 'features/account/accountApi';
import { logout } from 'features/account/accountSlice';

export const logoutEffects =
  ({ dispatch }) =>
  next =>
  action => {
    if (logout.match(action)) dispatch(accountApi.endpoints.logout.initiate());
    return next(action);
  };
