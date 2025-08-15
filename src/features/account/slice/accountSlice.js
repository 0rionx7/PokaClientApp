import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { accountApi } from '@account/api/accountApi';

const initialStateFn = () => {
  const initialState = {
    username: '',
    token: '',
    messages: [],
    hideInfo: false,
    deckColor: 'rgb(255 0 0 / 90%)',
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
    resetMessages: (state, action) => {
      state.messages = [];
    },
    resetToken: (state, action) => {
      state.token = 'ale';
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
      );
  },
  selectors: {
    selectUserName: accountState => accountState.username,
    selectHideInfo: accountState => accountState.hideInfo,
    selectMessagess: accountState => accountState.messages,
    selectDeckColor: accountState => accountState.deckColor,
    selectToken: accountState => accountState.token,
  },
});

export const {
  setHideInfo,
  setDeckColor,
  postMessage,
  resetMessages,
  resetToken,
} = accountSlice.actions;
export const {
  selectUserName,
  selectHideInfo,
  selectMessagess,
  selectDeckColor,
  selectToken,
} = accountSlice.selectors;
