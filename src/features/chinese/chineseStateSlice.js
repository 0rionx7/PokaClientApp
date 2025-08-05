import { createSlice } from '@reduxjs/toolkit';
import { chineseApi } from 'features/chinese/chineseApi';

export const initialGameState = {
  playerName: '',
  boardCards: Array(13).fill(null),
  hand: [],
  isFantasy: false,
  isFoul: false,
  royalties: [0, 0, 0],
  linesScore: [0, 0, 0],
  gameScore: 0,
  roundScore: 0,
  sittingOut: true,
  socketId: null,
  isSubscribed: false,
};

export const chineseStateSlice = createSlice({
  name: 'chineseState',
  initialState: initialGameState,
  reducers: {
    setLocalPlayerState: (_state, action) => action.payload,
    moveCard: (state, action) => {
      const { place, index, card } = action.payload;
      const movedCard = matchedCard =>
        matchedCard?.value + matchedCard?.suit === card.value + card.suit;

      const boardCard = state.boardCards.find(movedCard);
      const handCard = state.hand.find(movedCard);
      if (boardCard) {
        const removalIndex = state.boardCards.indexOf(boardCard);
        state.boardCards.splice(removalIndex, 1, null);
      }
      if (handCard) {
        const removalIndex = state.hand.indexOf(handCard);
        state.hand.splice(removalIndex, 1, null);
      }
      state[place][index] = card;
    },
    orderByValue: (state, _action) => {
      state.hand.sort((cardA, cardB) => {
        if (!cardA) return -1;
        if (!cardB) return 1;
        return cardA.value - cardB.value;
      });
    },
    orderBySuit: (state, _action) => {
      function orderHandBySuit(hand) {
        const nulls = hand.filter(card => card === null);
        const hearts = hand.filter(card => card?.suit === 'H');
        const clubs = hand.filter(card => card?.suit === 'C');
        const spades = hand.filter(card => card?.suit === 'S');
        const diamonds = hand.filter(card => card?.suit === 'D');
        return nulls.concat(clubs, hearts, spades, diamonds);
      }
      state.hand = orderHandBySuit(state.hand);
    },
  },
  extraReducers: builder =>
    builder.addMatcher(
      chineseApi.endpoints.sitOutChinese.matchPending,
      (_state, _action) => chineseStateSlice.getInitialState()
    ),
  selectors: {
    selectBoardCards: chineseState => chineseState.boardCards,
    selectHandcards: chineseState => chineseState.hand,
    selectIsFantasy: chineseState => chineseState.isFantasy,
  },
});

export const { setLocalPlayerState, moveCard, orderBySuit, orderByValue } =
  chineseStateSlice.actions;

export const { selectBoardCards, selectHandcards, selectIsFantasy } =
  chineseStateSlice.selectors;
