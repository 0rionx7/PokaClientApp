import { createSlice } from '@reduxjs/toolkit';

import { logout } from 'features/authSlice/authSlice';
import { faceUp } from 'common/utilities-functions';
import { gameApi } from 'features/gameStateSlice/gameApi';

export const gameStateSlice = createSlice({
  name: 'gameState',
  initialState: {
    gameId: '',
    tableName: '',
    tableCards: [],
    handCards: [],
    messages: [],
    joinRequests: [],
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
        gameApi.endpoints.openTable.matchFulfilled,
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
      ),
});

export const {
  setTableCards,
  setCurrentChoosenGame,
  setHandCards,
  toggleSelectedCard,
  setGameInfo,
  resetGameState,
  removeRequest,
  postMessage,
  setRequestGameId,
} = gameStateSlice.actions;
export const gameStateReducer = gameStateSlice.reducer;
