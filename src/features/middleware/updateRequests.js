import { gameStateApi } from 'features/gameState/gameStateApi';

export const updateRequests =
  ({ dispatch }) =>
  next =>
  action => {
    if (
      gameStateApi.endpoints.rejectRequest.matchFulfilled(action) ||
      gameStateApi.endpoints.joinTable.matchFulfilled(action)
    ) {
      const username =
        action.payload.username || action.meta.arg.originalArgs.playerName;
      dispatch(
        gameStateApi.util.updateQueryData(
          'getRequests',
          action.payload.tableName,
          draft => draft.filter(req => req.username !== username)
        )
      );
    }

    return next(action);
  };
