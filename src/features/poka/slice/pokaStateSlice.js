import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { gameNames } from '@poka/utils/games';
import { pokaApi } from '@poka/api/pokaApi';

export const pokaStateSlice = createSlice({
  name: 'pokaState',
  initialState: {
    chosenTableCardIndexes: [],
    chosenHandCardIndexes: [],
    chosenGame: gameNames.MAMUT,
    gameId: '',
  },
  reducers: {
    toggleChosenCard: (state, action) => {
      const { place, index } = action.payload;

      const toggleChosenIndex = (indexes, index) =>
        indexes.includes(index)
          ? indexes.filter(i => i !== index)
          : [...indexes, index];

      if (place === 'hand') {
        state.chosenHandCardIndexes = toggleChosenIndex(
          state.chosenHandCardIndexes,
          index
        );
      } else {
        state.chosenTableCardIndexes = toggleChosenIndex(
          state.chosenTableCardIndexes,
          index
        );
      }
    },
    setChosenGame: (state, action) => {
      state.chosenGame = action.payload;
    },
  },
  extraReducers: builder =>
    builder
      .addMatcher(
        isAnyOf(
          pokaApi.endpoints.sitOut.matchFulfilled,
          pokaApi.endpoints.submitCards.matchFulfilled,
          pokaApi.endpoints.selectCards.matchFulfilled
        ),
        (_state, _action) => pokaStateSlice.getInitialState()
      )
      .addMatcher(
        isAnyOf(
          pokaApi.endpoints.openPokaTable.matchFulfilled,
          pokaApi.endpoints.restartGame.matchFulfilled,
          pokaApi.endpoints.sitDown.matchFulfilled,
          pokaApi.endpoints.restartGame.matchFulfilled
        ),
        (state, action) => {
          state.gameId = action.payload.gameId;
        }
      ),
  selectors: {
    selectChosenHandCardIndexes: pokaState => pokaState.chosenHandCardIndexes,
    selectChosenTableCardIndexes: pokaState => pokaState.chosenTableCardIndexes,
    selectChosenGame: pokaState => pokaState.chosenGame,
    selectGameId: pokaState => pokaState.gameId,
  },
});

export const { setChosenGame, toggleChosenCard } = pokaStateSlice.actions;

export const {
  selectChosenHandCardIndexes,
  selectChosenTableCardIndexes,
  selectChosenGame,
  selectGameId,
} = pokaStateSlice.selectors;
