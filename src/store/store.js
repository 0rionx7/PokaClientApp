import { configureStore } from '@reduxjs/toolkit';
import { gameApiReducer, gameApi } from '../features/gameApi/gameApi';
import {
  gameStateReducer,
  gameStateSlice,
} from '../features/gameStateSlice/gameStateSlice';
import { errorHandling } from '../features/middleware/errorHandling';
import { authReducer, authSlice } from '../features/authSlice/authSlice';
import { tableSittingListener } from 'src/features/middleware/tableSittingListener';
import { logoutEffects } from 'src/features/middleware/logoutEffects';
import { cancelRequestEffects } from 'src/features/middleware/cancelRequestEffects';

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
