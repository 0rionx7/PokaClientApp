import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { accountApi } from '@account/api/accountApi';

const initialStateFn = () => {
  const initialState = {
    username: '',
    token: '',
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
    selectUserName: account => account.username,
    selectHideInfo: account => account.hideInfo,
    selectDeckColor: account => account.deckColor,
    selectToken: account => account.token,
  },
});

export const { setHideInfo, setDeckColor } = accountSlice.actions;
export const { selectUserName, selectHideInfo, selectDeckColor, selectToken } =
  accountSlice.selectors;
