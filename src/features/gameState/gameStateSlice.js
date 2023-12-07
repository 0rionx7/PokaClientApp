import { createSlice } from '@reduxjs/toolkit';

import { logout } from 'features/account/accountSlice';
import { faceUp } from 'common/utilities-functions';
import { gameStateApi } from 'features/gameState/gameStateApi';

export const gameStateSlice = createSlice({
  name: 'gameState',
  initialState: {
    gameId: '',
    tableName: '',
    tableCards: [],
    handCards: [],
    messages: [],
    currentChoosenGame: '',
  },
  reducers: {
    setTableCards: (state, action) => {
      state.tableCards = action.payload;
    },
    setCurrentChoosenGame: (state, action) => {
      state.currentChoosenGame = action.payload;
    },
    setHandCards: (state, action) => {
      state.handCards = action.payload.map(faceUp);
    },
    setGameInfo: (state, action) => ({ ...state, ...action.payload }),
    resetGameState: (_state, _action) => gameStateSlice.getInitialState(),
    postMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    toggleSelectedCard: (state, action) => {
      const selectedCard = card =>
        card.value + card.suit === action.payload.value + action.payload.suit;
      const toggleCard = (cards, index) =>
        (cards[index].selected = !cards[index].selected);
      const handIndex = state.handCards.findIndex(selectedCard);
      const tableIndex = state.tableCards.findIndex(selectedCard);
      if (handIndex !== -1) toggleCard(state.handCards, handIndex);
      if (tableIndex !== -1) toggleCard(state.tableCards, tableIndex);
    },
  },
  extraReducers: builder =>
    builder
      .addCase(logout, (_state, _action) => gameStateSlice.getInitialState())
      .addMatcher(
        gameStateApi.endpoints.openTable.matchFulfilled,
        (state, action) => ({ ...state, ...action.payload })
      ),
});

export const {
  setTableCards,
  setCurrentChoosenGame,
  setHandCards,
  toggleSelectedCard,
  setGameInfo,
  resetGameState,
  postMessage,
} = gameStateSlice.actions;
export const gameStateReducer = gameStateSlice.reducer;
