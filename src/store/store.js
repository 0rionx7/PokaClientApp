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
import { authReducer, accountSlice } from '../features/account/accountSlice';

export const store = configureStore({
  reducer: {
    [accountSlice.name]: authReducer,
    [gameStateSlice.name]: gameStateReducer,
    [gameStateApi.reducerPath]: gameApiReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(gameStateApi.middleware, errorHandling),
});
