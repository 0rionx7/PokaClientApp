import { createSlice } from '@reduxjs/toolkit';

import { gameNames } from '@poka/utils/games';
import { pokaApi } from '@poka/api/pokaApi';

export const pokaStateSlice = createSlice({
  name: 'pokaState',
  initialState: {
    chosenTableCardIndexes: [],
    chosenHandCardIndexes: [],
    chosenGame: gameNames.MAMUT,
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
      .addMatcher(pokaApi.endpoints.sitOut.matchFulfilled, (_state, _action) =>
        pokaStateSlice.getInitialState()
      )
      .addMatcher(
        pokaApi.endpoints.submitCards.matchFulfilled,
        (state, _action) => {
          const selectedHandIndexesCount = state.chosenHandCardIndexes.length;
          state.chosenHandCardIndexes = [
            ...Array(selectedHandIndexesCount).keys(),
          ];
          state.chosenTableCardIndexes = [];
        }
      ),
  selectors: {
    selectChosenHandCardIndexes: pokaState => pokaState.chosenHandCardIndexes,
    selectChosenTableCardIndexes: pokaState => pokaState.chosenTableCardIndexes,
    selectChosenGame: pokaState => pokaState.chosenGame,
  },
});

export const { setChosenGame, toggleChosenCard } = pokaStateSlice.actions;

export const {
  selectChosenHandCardIndexes,
  selectChosenTableCardIndexes,
  selectChosenGame,
} = pokaStateSlice.selectors;
