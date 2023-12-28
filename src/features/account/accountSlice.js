import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { gameStateApi } from 'features/gameState/gameStateApi';
import { accountApi } from 'features/account/accountApi';

const initialStateFn = () => {
  const initialState = {
    username: '',
    token: '',
    joinRequests: [],
    hideInfo: false,
  };
  try {
    initialState.hideInfo = JSON.parse(window.localStorage.getItem('hideInfo'));
  } catch (error) {}
  return initialState;
};
export const accountSlice = createSlice({
  name: 'account',
  initialState: initialStateFn,
  reducers: {
    requestRejected: (state, action) => {
      state.joinRequests = state.joinRequests.filter(
        tableInfo => tableInfo.tableName !== action.payload.tableName
      );
    },
    setRequestGameId: (state, action) => {
      const approvedRequest = state.joinRequests.find(
        ({ tableName }) => tableName === action.payload.tableName
      );
      if (approvedRequest) approvedRequest.joined = action.payload.gameId;
    },
    setHideInfo: (state, action) => ({ ...state, hideInfo: action.payload }),
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
        isAnyOf(
          gameStateApi.endpoints.openTable.matchFulfilled,
          gameStateApi.endpoints.restartGame.matchFulfilled,
          gameStateApi.endpoints.sitDown.matchFulfilled
        ),
        (state, _action) => {
          state.joinRequests = [];
        }
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
export const { requestRejected, setRequestGameId, setHideInfo } =
  accountSlice.actions;
