import { createListenerMiddleware } from '@reduxjs/toolkit';
import { gameStateApi } from 'features/gameState/gameStateApi';

export const sitDownListener = createListenerMiddleware();

sitDownListener.startListening({
  predicate: (_action, currentState, previousState) => {
    if (!currentState.gameState.gameId) return false;
    return currentState.gameState.gameId !== previousState.gameState.gameId;
  },
  effect: (_action, { getState, dispatch }) => {
    getState().account.joinRequests.forEach(({ tableName }) => {
      dispatch(gameStateApi.endpoints.cancelRequest.initiate({ tableName }));
    });
  },
});
