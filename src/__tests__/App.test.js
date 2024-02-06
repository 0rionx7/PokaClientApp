import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import App from 'App';
import { accountReducer, accountSlice } from 'features/account/accountSlice';
import { gameApiReducer, gameStateApi } from 'features/gameState/gameStateApi';
import {
  gameStateReducer,
  gameStateSlice,
} from 'features/gameState/gameStateSlice';
import { errorHandling } from 'features/middleware/errorHandling';
import { updateRequests } from 'features/middleware/updateRequests';
import { updateTables } from 'features/middleware/updateTables';
import { Provider } from 'react-redux';

test('should display heading text', () => {
  const store = configureStore({
    reducer: {
      [accountSlice.name]: accountReducer,
      [gameStateSlice.name]: gameStateReducer,
      [gameStateApi.reducerPath]: gameApiReducer,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(
        gameStateApi.middleware,
        updateTables,
        updateRequests,
        errorHandling
      ),
  });
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const headingText = screen.getByText('Hello');
  expect(headingText).toBeInTheDocument();
});
