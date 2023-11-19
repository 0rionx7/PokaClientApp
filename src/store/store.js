import { configureStore } from '@reduxjs/toolkit';
import { gameApiReducer, gameApi } from '../features/gameApi/gameApi';
import {
  gameStateReducer,
  gameStateSlice,
} from '../features/gameStateSlice/gameStateSlice';
import { errorHandling } from '../features/middleware/errorHandling';
import { authReducer, authSlice } from '../features/authSlice/authSlice';
import { tableSittingListener } from 'features/middleware/tableSittingListener';
import { logoutEffects } from 'features/middleware/logoutEffects';
import { cancelRequestEffects } from 'features/middleware/cancelRequestEffects';

export const store = configureStore({
  reducer: {
    [gameStateSlice.name]: gameStateReducer,
    [gameApi.reducerPath]: gameApiReducer,
    [authSlice.name]: authReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .prepend(tableSittingListener.middleware)
      .concat(
        gameApi.middleware,
        logoutEffects,
        cancelRequestEffects,
        errorHandling
      ),
});
