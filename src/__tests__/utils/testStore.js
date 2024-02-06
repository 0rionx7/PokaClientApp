import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { gameApiReducer, gameStateApi } from 'features/gameState/gameStateApi';
import {
  gameStateReducer,
  gameStateSlice,
} from 'features/gameState/gameStateSlice';
import { accountReducer, accountSlice } from 'features/account/accountSlice';

const rootReducer = combineReducers({
  [gameStateApi.reducerPath]: gameApiReducer,
  [gameStateSlice.name]: gameStateReducer,
  [accountSlice.name]: accountReducer,
});

export const setupStore = preloadedState => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};
