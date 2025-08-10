import { createSlice } from '@reduxjs/toolkit';

import { revealCard, unselectAll } from '@utils/utilities-functions';
import { gameNames } from '@poka/utils/games';
import { pokaApi } from '@poka/api/pokaApi';

export const pokaStateSlice = createSlice({
  name: 'pokaState',
  initialState: {
    tableCards: [],
    handCards: [],
    messages: [],
    currentChoosenGame: gameNames.MAMUT,
  },
  reducers: {
    setTableCards: (state, action) => {
      state.tableCards = action.payload;
    },
    setHandCards: (state, action) => {
      state.handCards = action.payload.map(revealCard);
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
    setCurrentChoosenGame: (state, action) => {
      state.currentChoosenGame = action.payload;
    },
    postMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    resetMessages: (state, action) => {
      state.messages = [];
    },
  },
  extraReducers: builder =>
    builder
      .addMatcher(pokaApi.endpoints.sitOut.matchFulfilled, (_state, _action) =>
        pokaStateSlice.getInitialState()
      )
      .addMatcher(
        pokaApi.endpoints.submitCards.matchFulfilled,
        (state, _action) => ({
          ...state,
          tableCards: state.tableCards.map(unselectAll),
        })
      ),
  selectors: {
    selectHandcards: pokaState => pokaState.handCards,
    selectTablecards: pokaState => pokaState.tableCards,
    selectMessagess: pokaState => pokaState.messages,
    selectCurrentChoosenGame: pokaState => pokaState.currentChoosenGame,
  },
});

export const {
  setTableCards,
  setCurrentChoosenGame,
  setHandCards,
  toggleSelectedCard,
  postMessage,
  resetMessages,
} = pokaStateSlice.actions;

export const {
  selectHandcards,
  selectTablecards,
  selectMessagess,
  selectCurrentChoosenGame,
} = pokaStateSlice.selectors;
