import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { gameStateApi } from 'features/gameState/gameStateApi';
import { accountApi } from 'features/account/accountApi';

export const accountSlice = createSlice({
  name: 'account',
  initialState: {
    username: '',
    token: '',
    joinRequests: [],
  },
  reducers: {
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
          accountApi.endpoints.login.matchFulfilled,
          accountApi.endpoints.register.matchFulfilled,
          accountApi.endpoints.usernameChange.matchFulfilled,
          accountApi.endpoints.redirectedLogin.matchFulfilled
        ),
        (state, action) => ({ ...state, ...action.payload })
      )
      .addMatcher(
        accountApi.endpoints.logOut.matchFulfilled,
        (_state, _action) => accountSlice.getInitialState()
      )
      .addMatcher(
        gameStateApi.endpoints.requestJoin.matchFulfilled,
        (state, action) => {
          state.joinRequests.push({ tableName: action.payload });
        }
      )
      .addMatcher(
        gameStateApi.endpoints.cancelRequest.matchFulfilled,
        (state, action) => {
          state.joinRequests = state.joinRequests.filter(
            requestInfo => requestInfo.tableName !== action.payload.tableName
          );
        }
      );
  },
});

export const accountReducer = accountSlice.reducer;
export const { removeRequest, setRequestGameId } = accountSlice.actions;
