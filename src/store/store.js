import { combineSlices, configureStore } from '@reduxjs/toolkit';

import { pokaApi } from '../features/poka/pokaApi';
import { pokaStateSlice } from '../features/poka/pokaStateSlice';
import { errorHandling } from '../features/middleware/errorHandling';
import { accountSlice } from '../features/account/accountSlice';
import { chineseStateSlice } from 'features/chinese/chineseStateSlice';
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
