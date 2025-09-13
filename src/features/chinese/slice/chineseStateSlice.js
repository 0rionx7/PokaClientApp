import { createSlice } from '@reduxjs/toolkit';
import { chineseApi } from '@chinese/api/chineseApi';

export const chineseStateSlice = createSlice({
  name: 'chineseState',
  initialState: {
    boardCards: Array(13).fill(null),
    handCards: [],
    isFantasy: false,
  },
  reducers: {
    setLocalPlayerState: (_state, action) => {
      const { boardCards, handCards, isFantasy } = action.payload;
      return { boardCards, handCards, isFantasy };
    },
    moveCard: (state, action) => {
      const { place, index, card } = action.payload;

      state.boardCards = removeCard(state.boardCards, card);
      state.handCards = removeCard(state.handCards, card);
      state[place][index] = card;
    },
    orderByValue: (state, _action) => {
      state.handCards.sort(byValue);
    },
    orderBySuit: (state, _action) => {
      state.handCards.sort(bySuit);
    },
  },
  extraReducers: (builder) =>
    builder.addMatcher(
      chineseApi.endpoints.sitOutChinese.matchPending,
      (_state, _action) => chineseStateSlice.getInitialState(),
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

const removeCard = (cards, movedCard) =>
  cards.map((card) =>
    card?.value + card?.suit === movedCard.value + movedCard.suit ? null : card,
  );
const byValue = (a, b) => {
  if (!a) return -1;
  if (!b) return 1;
  return a.value - b.value;
};
const bySuit = (a, b) => {
  if (!a) return -1;
  if (!b) return 1;
  if (a.suit === 'D' && b.suit === 'D') return a.value - b.value;
  if (a.suit === 'D') return -1;
  if (b.suit === 'D') return 1;
  return a.suit.localeCompare(b.suit) || a.value - b.value;
};
