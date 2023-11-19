import { logout } from 'src/features/authSlice/authSlice';
import { logOutEndpoint } from 'src/features/authSlice/useLogOutMutation';
import { cancelRequestEndpoint } from 'src/features/gameApi/gameStateMutations/useCancelRequestMutation';

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
