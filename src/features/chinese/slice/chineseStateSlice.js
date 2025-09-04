import { createSlice } from '@reduxjs/toolkit';
import { chineseApi } from '@chinese/api/chineseApi';

export const initialGameState = {
  boardCards: Array(13).fill(null),
  handCards: [],
  isFantasy: false,
};

export const chineseStateSlice = createSlice({
  name: 'chineseState',
  initialState: initialGameState,
  reducers: {
    setLocalPlayerState: (_state, action) => {
      const { boardCards, handCards, isFantasy } = action.payload;
      return { boardCards, handCards, isFantasy };
    },
    moveCard: (state, action) => {
      const { place, index, movedCard } = action.payload;

      state.boardCards = state.boardCards.map((boardCard) =>
        boardCard?.value + boardCard?.suit === movedCard.value + movedCard.suit
          ? null
          : boardCard
      );
      state.handCards = state.handCards.map((handCard) =>
        handCard?.value + handCard?.suit === movedCard.value + movedCard.suit
          ? null
          : handCard
      );
      state[place][index] = movedCard;
    },
    orderByValue: (state, _action) => {
      state.handCards.sort((a, b) => {
        if (!a) return -1;
        if (!b) return 1;
        return a.value - b.value;
      });
    },
    orderBySuit: (state, _action) => {
      state.handCards = state.handCards.sort((a, b) => {
        if (!a) return -1;
        if (!b) return 1;
        if (a.suit === 'D' && b.suit === 'D') return a.value - b.value;
        if (a.suit === 'D') return -1;
        if (b.suit === 'D') return 1;
        return a.suit.localeCompare(b.suit) || a.value - b.value;
      });
    },
  },
  extraReducers: (builder) =>
    builder.addMatcher(
      chineseApi.endpoints.sitOutChinese.matchPending,
      (_state, _action) => chineseStateSlice.getInitialState()
    ),
  selectors: {
    selectBoardCards: (chineseState) => chineseState.boardCards,
    selectHandcards: (chineseState) => chineseState.handCards,
    selectIsFantasy: (chineseState) => chineseState.isFantasy,
  },
});

export const { setLocalPlayerState, moveCard, orderBySuit, orderByValue } =
  chineseStateSlice.actions;

export const { selectBoardCards, selectHandcards, selectIsFantasy } =
  chineseStateSlice.selectors;
