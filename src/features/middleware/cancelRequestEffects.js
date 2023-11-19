import { gameApi } from 'features/gameApi/gameApi';
import { cancelRequestEndpoint } from 'features/gameApi/gameStateMutations/useCancelRequestMutation';

export const cancelRequestEffects =
  ({ dispatch }) =>
  next =>
  action => {
    if (cancelRequestEndpoint.cancelRequest.matchFulfilled(action))
      dispatch(
        gameApi.endpoints.getTables.initiate(undefined, {
          forceRefetch: true,
        })
      );
    return next(action);
  };
