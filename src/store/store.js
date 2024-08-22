import { combineSlices, configureStore } from '@reduxjs/toolkit';

import { gameStateApi } from '../features/gameState/gameStateApi';
import { gameStateSlice } from '../features/gameState/gameStateSlice';
import { errorHandling } from '../features/middleware/errorHandling';
import { accountSlice } from '../features/account/accountSlice';
import { gameStateChineseSlice } from 'features/gameStateChinese/gameStateSlice';
import { setupListeners } from '@reduxjs/toolkit/query';

const rootReducer = combineSlices(
  gameStateApi,
  gameStateSlice,
  gameStateChineseSlice,
  accountSlice
);

export const makeStore = preloadedState => {
  const store = configureStore({
    reducer: rootReducer,
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware().concat(
        gameStateApi.middleware,
        errorHandling
      );
    },
    preloadedState,
  });
  // configure listeners using the provided defaults
  // optional, but required for `refetchOnFocus`/`refetchOnReconnect` behaviors
  setupListeners(store.dispatch);
  return store;
};

export const store = makeStore();
