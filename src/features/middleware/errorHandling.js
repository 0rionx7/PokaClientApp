import { isRejectedWithValue } from '@reduxjs/toolkit';

export const errorHandling = _api => next => action => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood,
  // so we're able to utilize these matchers!
  if (isRejectedWithValue(action)) console.log(action.payload);

  return next(action);
};
