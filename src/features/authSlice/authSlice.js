import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { authApi } from 'features/authSlice/authApi';
import { loginEndpoint } from 'features/authSlice/useLoginMutation';
import { registerEndpoint } from 'features/authSlice/useRegisterMutation';
import { redirectedLoginEndpoint } from 'features/authSlice/useRedirectedLoginMutation';

export const authSlice = createSlice({
  name: 'auth',
  initialState: { username: '', token: '' },
  reducers: {
    logout: (_state, _action) => authSlice.getInitialState(),
  },
  extraReducers: builder => {
    builder.addMatcher(
      isAnyOf(
        loginEndpoint.login.matchFulfilled,
        registerEndpoint.register.matchFulfilled,
        redirectedLoginEndpoint.redirectedLogin.matchFulfilled,
        authApi.endpoints.usernameChange.matchFulfilled
      ),
      (_state, action) => ({ ...action.payload })
    );
  },
});

export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;
