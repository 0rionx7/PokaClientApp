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
import {
  gameStateChineseReducer,
  gameStateChineseSlice,
} from 'features/gameStateChinese/gameStateSlice';

export const store = configureStore({
  reducer: {
    [gameStateApi.reducerPath]: gameApiReducer,
    [gameStateSlice.name]: gameStateReducer,
    [gameStateChineseSlice.name]: gameStateChineseReducer,
    [accountSlice.name]: accountReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(gameStateApi.middleware, errorHandling),
});
