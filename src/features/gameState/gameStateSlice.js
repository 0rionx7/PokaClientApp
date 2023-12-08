import { createSlice, isAnyOf } from '@reduxjs/toolkit';

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
      .addMatcher(
        isAnyOf(
          gameStateApi.endpoints.openTable.matchFulfilled,
          gameStateApi.endpoints.sitDown.matchFulfilled,
          gameStateApi.endpoints.restartGame.matchFulfilled
        ),
        (state, action) => ({ ...state, ...action.payload })
      )
      .addMatcher(
        gameStateApi.endpoints.sitOut.matchFulfilled,
        (_state, _action) => gameStateSlice.getInitialState()
      ),
});

export const {
  setTableCards,
  setCurrentChoosenGame,
  setHandCards,
  toggleSelectedCard,
  postMessage,
} = gameStateSlice.actions;
export const gameStateReducer = gameStateSlice.reducer;
