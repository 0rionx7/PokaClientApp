import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { authApi } from 'features/authSlice/authApi';
import { loginEndpoint } from 'features/authSlice/useLoginMutation';
import { registerEndpoint } from 'features/authSlice/useRegisterMutation';
import { redirectedLoginEndpoint } from 'features/authSlice/useRedirectedLoginMutation';

const initialState = { username: '', token: '' };

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (_state, _action) => initialState,
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
