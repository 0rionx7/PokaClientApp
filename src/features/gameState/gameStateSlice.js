import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { faceUp, unselectAll } from 'utils/utilities-functions';
import { gameStateApi } from 'features/gameState/gameStateApi';
import { gameNames } from 'utils/text-constants';

export const gameStateSlice = createSlice({
  name: 'gameState',
  initialState: {
    gameId: '',
    tableName: '',
    tableCards: [],
    handCards: [],
    messages: [],
    currentChoosenGame: gameNames.MAMUT,
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
    resetMessages: (state, action) => {
      state.messages = [];
    },
    toggleSelectedCard: (state, action) => {
      const selectedCard = card =>
        card.value + card.suit === action.payload.value + action.payload.suit;
      const toggleCard = (cards, index) =>
        (cards[index].selected = !cards[index].selected);
      const handIndex = state.handCards.findIndex(selectedCard);
      const tableIndex = state.tableCards.findIndex(selectedCard);
      if (handIndex !== -1) toggleCard(state.handCards, handIndex);
      else toggleCard(state.tableCards, tableIndex);
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
        gameStateApi.endpoints.getGameState.matchFulfilled,
        (state, action) => {
          state.gameId = action.payload._id;
          state.tableName = action.payload.tableName;
        }
      )
      .addMatcher(
        gameStateApi.endpoints.sitOut.matchFulfilled,
        (_state, _action) => gameStateSlice.getInitialState()
      )
      .addMatcher(
        gameStateApi.endpoints.submitCards.matchFulfilled,
        (state, _action) => ({
          ...state,
          tableCards: state.tableCards.map(unselectAll),
        })
      ),
  selectors: {
    selectHandcards: gameState => gameState.handCards,
    selectTablecards: gameState => gameState.tableCards,
    selectMessagess: gameState => gameState.messages,
  },
});

export const {
  setTableCards,
  setCurrentChoosenGame,
  setHandCards,
  toggleSelectedCard,
  postMessage,
  resetMessages,
} = gameStateSlice.actions;

export const { selectHandcards, selectTablecards, selectMessagess } =
  gameStateSlice.selectors;
