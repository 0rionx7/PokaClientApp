import { requestRejected } from 'features/account/accountSlice';
import { gameStateApi } from 'features/gameState/gameStateApi';

export const updateTables =
  ({ dispatch, getState }) =>
  next =>
  action => {
    if (
      gameStateApi.endpoints.cancelRequest.matchFulfilled(action) ||
      requestRejected.match(action)
    )
      dispatch(
        gameStateApi.util.updateQueryData('getTables', undefined, draft => {
          if (
            draft.every(
              ({ tableName }) => tableName !== action.payload.tableName
            )
          )
            draft.push(action.payload);
        })
      );
    if (gameStateApi.endpoints.requestJoin.matchFulfilled(action))
      dispatch(
        gameStateApi.util.updateQueryData('getTables', undefined, draft =>
          draft.filter(
            availableTable => availableTable.tableName !== action.payload
          )
        )
      );
    if (gameStateApi.endpoints.sitDown.matchFulfilled(action))
      dispatch(
        gameStateApi.util.updateQueryData('getTables', undefined, draft => {
          if (
            draft.every(
              ({ tableName }) => tableName !== action.payload.tableName
            )
          )
            draft.push({
              tableName: action.payload.tableName,
              joined: action.payload.gameId,
            });
        })
      );
    if (
      gameStateApi.endpoints.openTable.matchFulfilled(action) ||
      gameStateApi.endpoints.restartGame.matchFulfilled(action)
    )
      dispatch(
        gameStateApi.util.updateQueryData('getTables', undefined, draft => {
          const updatedInfo = {
            tableName: action.payload.tableName,
            joined: action.payload.gameId,
          };
          draft.push(updatedInfo);
          draft.push(...getState().account.joinRequests);
        })
      );

    return next(action);
  };
