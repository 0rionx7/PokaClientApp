import { authApi } from 'features/authSlice/authApi';
import { logout } from 'features/authSlice/authSlice';

export const logoutEffects =
  ({ dispatch }) =>
  next =>
  action => {
    if (logout.match(action)) dispatch(authApi.endpoints.logout.initiate());
    return next(action);
  };
