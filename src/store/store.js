import { configureStore } from '@reduxjs/toolkit';

import {
  gameApiReducer,
  gameStateApi,
} from '../features/gameState/gameStateApi';
import {
  gameStateReducer,
  gameStateSlice,
} from '../features/gameState/gameStateSlice';
import { errorHandling } from '../features/middleware/errorHandling';
import { accountReducer, accountSlice } from '../features/account/accountSlice';
import { updateTables } from 'features/middleware/updateTables';
import { updateRequests } from 'features/middleware/updateRequests';

export const store = configureStore({
  reducer: {
    [gameStateApi.reducerPath]: gameApiReducer,
    [gameStateSlice.name]: gameStateReducer,
    [accountSlice.name]: accountReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      gameStateApi.middleware,
      updateTables,
      updateRequests,
      errorHandling
    ),
});
