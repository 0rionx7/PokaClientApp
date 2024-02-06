import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { accountReducer, accountSlice } from 'features/account/accountSlice';
import { gameApiReducer, gameStateApi } from 'features/gameState/gameStateApi';
import {
  gameStateReducer,
  gameStateSlice,
} from 'features/gameState/gameStateSlice';

const rootReducer = combineReducers({
  [accountSlice.name]: accountReducer,
  [gameStateSlice.name]: gameStateReducer,
  [gameStateApi.reducerPath]: gameApiReducer,
});

export const setupStore = preloadedState => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};
