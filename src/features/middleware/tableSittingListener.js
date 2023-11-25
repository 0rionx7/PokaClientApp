import { createListenerMiddleware } from '@reduxjs/toolkit';
import { gameApi } from 'features/gameApi/gameApi';

export const tableSittingListener = createListenerMiddleware();

tableSittingListener.startListening({
  predicate: (_action, currentState, previousState) => {
    if (!currentState.gameState.gameId) return false;
    return currentState.gameState.gameId !== previousState.gameState.gameId;
  },
  effect: (_action, { getState, dispatch }) => {
    getState().gameState.joinRequests.forEach(request => {
      dispatch(gameApi.endpoints.cancelRequest.initiate(request));
    });
  },
});
