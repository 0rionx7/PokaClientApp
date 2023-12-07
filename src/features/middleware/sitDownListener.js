import { createListenerMiddleware } from '@reduxjs/toolkit';
import { gameApi } from 'features/gameStateSlice/gameApi';

export const sitDownListener = createListenerMiddleware();

sitDownListener.startListening({
  predicate: (_action, currentState, previousState) => {
    if (!currentState.gameState.gameId) return false;
    return currentState.gameState.gameId !== previousState.gameState.gameId;
  },
  effect: (_action, { getState, dispatch }) => {
    getState().auth.joinRequests.forEach(({ tableName }) => {
      dispatch(gameApi.endpoints.cancelRequest.initiate({ tableName }));
    });
  },
});
