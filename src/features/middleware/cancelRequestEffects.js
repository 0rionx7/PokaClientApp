import { gameApi } from 'features/gameApi/gameApi';

export const cancelRequestEffects =
  ({ dispatch }) =>
  next =>
  action => {
    if (gameApi.endpoints.cancelRequest.matchFulfilled(action))
      dispatch(
        gameApi.endpoints.getTables.initiate(undefined, {
          forceRefetch: true,
        })
      );
    return next(action);
  };
