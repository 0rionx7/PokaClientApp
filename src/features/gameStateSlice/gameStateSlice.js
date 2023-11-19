import { createSlice } from '@reduxjs/toolkit';

import { cancelRequestEndpoint } from 'src/features/gameApi/gameStateMutations/useCancelRequestMutation';
import { openTableEndpoint } from 'src/features/gameApi/gameStateMutations/useOpenTableMutation';
import { requestJoinEndpoint } from 'src/features/gameApi/gameStateMutations/useRequestJoinMutation';
import { sitOutEndpoint } from 'src/features/gameApi/gameStateMutations/useSitOutMutation';
import { logout } from 'src/features/authSlice/authSlice';
import { faceUp } from 'src/common/utilities-functions';

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
    postMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    removeRequest: (state, action) => {
      state.joinRequests = state.joinRequests.filter(
        tableInfo => tableInfo.tableName !== action.payload
      );
    },
    setJoinedRequest: (state, action) => {
      const joinedRequest = state.joinRequests.find(
        ({ tableName }) => tableName === action.payload
      );
      if (joinedRequest) joinedRequest.joined = true;
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
      .addMatcher(sitOutEndpoint.sitOut.matchFulfilled, (_state, _action) =>
        gameStateSlice.getInitialState()
      )
      .addMatcher(
        openTableEndpoint.openTable.matchFulfilled,
        (state, action) => ({ ...state, ...action.payload })
      )
      .addMatcher(
        requestJoinEndpoint.requestJoin.matchFulfilled,
        (state, action) => {
          if (!action.payload?.id)
            state.joinRequests.push({ tableName: action.payload.tableName });
        }
      )
      .addMatcher(
        cancelRequestEndpoint.cancelRequest.matchFulfilled,
        (state, action) => {
          state.joinRequests = state.joinRequests.filter(
            requestInfo => requestInfo.tableName !== action.payload.tableName
          );
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
  setJoinedRequest,
} = gameStateSlice.actions;
export const gameStateReducer = gameStateSlice.reducer;
