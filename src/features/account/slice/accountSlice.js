import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { accountApi } from '@account/api/accountApi';
import { pokaApi } from '@poka/api/pokaApi';
import { chineseApi } from '@chinese/api/chineseApi';

const initialStateFn = () => {
  const initialState = {
    token: '',
    messages: [],
    hideInfo: false,
    deckColor: 'rgb(255 0 0 / 90%)',
    gameId: '',
  };
  try {
    initialState.hideInfo =
      JSON.parse(window.localStorage.getItem('hideInfo')) || false;
    initialState.deckColor =
      window.localStorage.getItem('deckColor') || 'rgb(255 0 0 / 90%)';
  } catch (error) {
    console.log(error);
  }
  return initialState;
};
export const accountSlice = createSlice({
  name: 'account',
  initialState: initialStateFn,
  reducers: {
    setHideInfo: (state, action) => ({ ...state, hideInfo: action.payload }),
    setDeckColor: (state, action) => ({ ...state, deckColor: action.payload }),
    postMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    resetMessages: (state, _action) => {
      state.messages = [];
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(
        isAnyOf(
          accountApi.endpoints.login.matchFulfilled,
          accountApi.endpoints.register.matchFulfilled,
          accountApi.endpoints.usernameChange.matchFulfilled,
          accountApi.endpoints.reconnectedLogin.matchFulfilled
        ),
        (state, action) => ({ ...state, ...action.payload })
      )
      .addMatcher(
        accountApi.endpoints.logOut.matchFulfilled,
        (_state, _action) => accountSlice.getInitialState()
      )
      .addMatcher(
        isAnyOf(
          pokaApi.endpoints.openPokaTable.matchFulfilled,
          pokaApi.endpoints.restartGame.matchFulfilled,
          pokaApi.endpoints.sitDown.matchFulfilled,
          chineseApi.endpoints.openChineseTable.matchFulfilled,
          chineseApi.endpoints.sitDownChinese.matchFulfilled
        ),
        (state, action) => {
          state.gameId = action.payload.gameId;
        }
      )
      .addMatcher(
        isAnyOf(
          pokaApi.endpoints.sitOut.matchFulfilled,
          chineseApi.endpoints.sitOutChinese.matchFulfilled
        ),
        (state, _action) => {
          state.gameId = '';
        }
      );
  },
  selectors: {
    selectHideInfo: accountState => accountState.hideInfo,
    selectMessagess: accountState => accountState.messages,
    selectDeckColor: accountState => accountState.deckColor,
    selectToken: accountState => accountState.token,
    selectGameId: accountState => accountState.gameId,
  },
});

export const { setHideInfo, setDeckColor, postMessage, resetMessages } =
  accountSlice.actions;
export const {
  selectHideInfo,
  selectMessagess,
  selectDeckColor,
  selectToken,
  selectGameId,
} = accountSlice.selectors;
