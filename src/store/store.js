import { combineSlices, configureStore } from '@reduxjs/toolkit';

import { gameApi } from '@store/gameApi';
import { pokaStateSlice } from '@poka/slice/pokaStateSlice';
import { errorHandling } from '../middleware/errorHandling';
import { accountSlice } from '@account/slice/accountSlice';
import { chineseStateSlice } from '@chinese/slice/chineseStateSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { logoutMiddleware } from '../middleware/logOut';

const rootReducer = combineSlices(
  gameApi,
  pokaStateSlice,
  chineseStateSlice,
  accountSlice,
);

export const makeStore = (preloadedState) => {
  const store = configureStore({
    reducer: rootReducer,
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(
        gameApi.middleware,
        errorHandling,
        logoutMiddleware,
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
