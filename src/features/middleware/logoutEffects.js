import { authApi } from 'features/authSlice/authApi';
import { logout } from 'features/authSlice/authSlice';

import { cancelRequestEndpoint } from 'features/gameApi/gameStateMutations/useCancelRequestMutation';

export const logoutEffects =
  ({ getState, dispatch }) =>
  next =>
  action => {
    if (logout.match(action)) {
      dispatch(authApi.endpoints.logout.initiate());
      getState().gameState.joinRequests.forEach(request => {
        dispatch(cancelRequestEndpoint.cancelRequest.initiate(request));
      });
    }
    return next(action);
  };
