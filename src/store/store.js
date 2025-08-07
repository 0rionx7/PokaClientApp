import { combineSlices, configureStore } from '@reduxjs/toolkit';

import { pokaApi } from '@poka/api/pokaApi';
import { pokaStateSlice } from '@poka/slice/pokaStateSlice';
import { errorHandling } from '../middleware/errorHandling';
import { accountSlice } from '@account/slice/accountSlice';
import { chineseStateSlice } from '@chinese/slice/chineseStateSlice';
import { setupListeners } from '@reduxjs/toolkit/query';

const rootReducer = combineSlices(
  pokaApi,
  pokaStateSlice,
  chineseStateSlice,
  accountSlice
);

export const makeStore = preloadedState => {
  const store = configureStore({
    reducer: rootReducer,
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware().concat(pokaApi.middleware, errorHandling);
    },
    preloadedState,
  });
  // configure listeners using the provided defaults
  // optional, but required for `refetchOnFocus`/`refetchOnReconnect` behaviors
  setupListeners(store.dispatch);
  return store;
};

export const store = makeStore();
