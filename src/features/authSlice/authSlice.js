import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { authApi } from 'features/authSlice/authApi';

export const authSlice = createSlice({
  name: 'auth',
  initialState: { username: '', token: '' },
  reducers: {
    logout: (_state, _action) => authSlice.getInitialState(),
  },
  extraReducers: builder => {
    builder.addMatcher(
      isAnyOf(
        authApi.endpoints.login.matchFulfilled,
        authApi.endpoints.register.matchFulfilled,
        authApi.endpoints.usernameChange.matchFulfilled,
        authApi.endpoints.redirectedLogin.matchFulfilled
      ),
      (_state, action) => ({ ...action.payload })
    );
  },
});

export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;
