import { authApi } from 'features/authSlice/authApi';
import { logout } from 'features/authSlice/authSlice';
import { gameApi } from 'features/gameApi/gameApi';

export const logoutEffects =
  ({ getState, dispatch }) =>
  next =>
  action => {
    if (logout.match(action)) {
      dispatch(authApi.endpoints.logout.initiate());
      getState().gameState.joinRequests.forEach(request => {
        dispatch(gameApi.endpoints.cancelRequest.initiate(request));
      });
    }
    return next(action);
  };
