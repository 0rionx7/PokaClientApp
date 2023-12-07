import { configureStore } from '@reduxjs/toolkit';
import { gameApiReducer, gameApi } from '../features/gameStateSlice/gameApi';
import {
  gameStateReducer,
  gameStateSlice,
} from '../features/gameStateSlice/gameStateSlice';
import { errorHandling } from '../features/middleware/errorHandling';
import { authReducer, authSlice } from '../features/authSlice/authSlice';
import { sitDownListener } from 'features/middleware/sitDownListener';
import { logoutEffects } from 'features/middleware/logoutEffects';

export const store = configureStore({
  reducer: {
    [gameStateSlice.name]: gameStateReducer,
    [gameApi.reducerPath]: gameApiReducer,
    [authSlice.name]: authReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .prepend(sitDownListener.middleware)
      .concat(gameApi.middleware, logoutEffects, errorHandling),
});
