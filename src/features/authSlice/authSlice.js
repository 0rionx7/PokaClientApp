import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { gameApi } from 'features/gameStateSlice/gameApi';
import { authApi } from 'features/authSlice/authApi';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    username: '',
    token: '',
    joinRequests: [],
  },
  reducers: {
    logout: (_state, _action) => authSlice.getInitialState(),
    removeRequest: (state, action) => {
      state.joinRequests = state.joinRequests.filter(
        tableInfo => tableInfo.tableName !== action.payload
      );
    },
    setRequestGameId: (state, action) => {
      const joinedRequest = state.joinRequests.find(
        ({ tableName }) => tableName === action.payload.tableName
      );
      if (joinedRequest) joinedRequest.joined = action.payload.gameId;
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(
        isAnyOf(
          authApi.endpoints.login.matchFulfilled,
          authApi.endpoints.register.matchFulfilled,
          authApi.endpoints.usernameChange.matchFulfilled,
          authApi.endpoints.redirectedLogin.matchFulfilled
        ),
        (state, action) => ({ ...state, ...action.payload })
      )
      .addMatcher(
        gameApi.endpoints.requestJoin.matchFulfilled,
        (state, action) => {
          state.joinRequests.push({ tableName: action.payload });
        }
      )
      .addMatcher(
        gameApi.endpoints.cancelRequest.matchFulfilled,
        (state, action) => {
          state.joinRequests = state.joinRequests.filter(
            requestInfo => requestInfo.tableName !== action.payload.tableName
          );
        }
      )
      .addMatcher(
        gameApi.endpoints.sitDown.matchFulfilled,
        (state, _action) => {
          state.joinRequests = [];
        }
      );
  },
});

export const authReducer = authSlice.reducer;
export const { logout, removeRequest, setRequestGameId } = authSlice.actions;
