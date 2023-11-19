import { gameApi } from 'src/features/gameApi/gameApi';
import { cancelRequestEndpoint } from 'src/features/gameApi/gameStateMutations/useCancelRequestMutation';

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
