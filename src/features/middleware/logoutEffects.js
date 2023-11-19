import { logout } from 'features/authSlice/authSlice';
import { logOutEndpoint } from 'features/authSlice/useLogOutMutation';
import { cancelRequestEndpoint } from 'features/gameApi/gameStateMutations/useCancelRequestMutation';

export const logoutEffects =
  ({ getState, dispatch }) =>
  next =>
  action => {
    if (logout.match(action)) {
      dispatch(logOutEndpoint.logOut.initiate());
      getState().gameState.joinRequests.forEach(request => {
        dispatch(cancelRequestEndpoint.cancelRequest.initiate(request));
      });
    }
    return next(action);
  };
