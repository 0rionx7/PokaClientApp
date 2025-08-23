import { createSelector } from '@reduxjs/toolkit';

import { selectUserName } from '@account/api/accountApi';
import { isSitting, updateAll } from '@utils/helper-functions';
import { gameApi, socket } from '@store/gameApi';

export const pokaApi = gameApi.injectEndpoints({
  endpoints: build => ({
    getPokaState: build.query({
      query: gameId => ({
        url: `/poka/${gameId}`,
        params: { socketId: socket.id },
      }),
      async onCacheEntryAdded(gameId, { cacheEntryRemoved, updateCachedData }) {
        if (!gameId) return;

        try {
          const stateUpdateListener = stateUpdate => {
            updateCachedData(draft => ({ ...draft, ...stateUpdate }));
          };

          const closingBetListener = ({ _id, playerStates }) => {
            if (gameId === _id) {
              const updatedStates = updateAll(playerStates, { denying: 0 });
              updateCachedData(draft => ({
                ...draft,
                playerStates: updatedStates,
              }));
            }
          };

          socket.on('stateUpdated', stateUpdateListener);
          socket.on('closingBet', closingBetListener);
          await cacheEntryRemoved;
          socket.removeAllListeners('stateUpdated');
          socket.removeAllListeners('closingBet');
        } catch (error) {
          console.log(error);
        }
      },
      keepUnusedDataFor: 0,
    }),
    openPokaTable: build.mutation({
      query: openTableData => ({
        url: '/poka',
        method: 'POST',
        body: { openTableData, socketId: socket.id },
      }),
    }),
    restartGame: build.mutation({
      query: gameInfo => ({
        url: '/poka/restart',
        method: 'POST',
        body: { ...gameInfo, socketId: socket.id },
      }),
    }),
    setGameVariant: build.mutation({
      query: builderConfig => ({
        url: '/poka/variant',
        method: 'PATCH',
        body: builderConfig,
      }),
    }),
    bet: build.mutation({
      query: betInfo => ({
        url: '/poka/bet',
        method: 'PATCH',
        body: betInfo,
      }),
    }),
    denyCard: build.mutation({
      query: denyInfo => ({
        url: '/poka/deny',
        method: 'PATCH',
        body: denyInfo,
      }),
    }),
    selectCards: build.mutation({
      query: selectInfo => ({
        url: '/poka/select',
        method: 'PATCH',
        body: selectInfo,
      }),
    }),
    assignJoker: build.mutation({
      query: replacmentCards => ({
        url: '/poka/replace-joker',
        method: 'PATCH',
        body: replacmentCards,
      }),
    }),
    evaluateHand: build.mutation({
      query: handInfo => ({
        url: '/poka/evaluate',
        method: 'POST',
        body: handInfo,
      }),
    }),
    submitCards: build.mutation({
      query: handInfo => ({
        url: '/poka/submit',
        method: 'PATCH',
        body: handInfo,
      }),
    }),
    revealCards: build.mutation({
      query: gameId => ({
        url: '/poka/reveal',
        method: 'PATCH',
        body: { gameId },
      }),
    }),
    renewCava: build.mutation({
      query: renewInfo => ({
        url: '/poka/renew',
        method: 'PATCH',
        body: renewInfo,
      }),
    }),
    nextRound: build.mutation({
      query: gameId => ({
        url: '/poka/nextRound',
        method: 'PATCH',
        body: { gameId },
      }),
    }),
    sitDown: build.mutation({
      query: ({ gameId }) => ({
        url: '/poka/sitDown',
        method: 'PATCH',
        body: { gameId, socketId: socket.id },
      }),
    }),
    sitOut: build.mutation({
      query: sitOutInfo => ({
        url: '/poka/sitOut',
        method: 'PATCH',
        body: { ...sitOutInfo, socketId: socket.id },
      }),
    }),
    joinTable: build.mutation({
      query: joinInfo => ({
        url: '/poka/join',
        method: 'PATCH',
        body: joinInfo,
      }),
      invalidatesTags: ['Requests'],
    }),
  }),
});

const selectGameState = gameId => pokaApi.endpoints.getPokaState.select(gameId);
export const selectPlayerStates = gameId =>
  createSelector(
    selectGameState(gameId),
    result => result?.data?.playerStates ?? []
  );
export const selectSittingPlayers = gameId =>
  createSelector(
    selectGameState(gameId),
    result => result?.data?.playerStates?.filter(isSitting) ?? []
  );
export const selectSittingPlayersWithMoney = gameId =>
  createSelector(
    selectGameState(gameId),
    result =>
      result?.data?.playerStates?.filter(
        state => state.resta > 0 && !state.sittingOut
      ) ?? []
  );
export const selectHostPlayerState = gameId =>
  createSelector(
    selectGameState(gameId),
    selectUserName,
    (gameState, playerName) =>
      gameState?.data?.playerStates?.find(ps => ps.playerName === playerName) ??
      []
  );
export const selectNextPlayers = gameId =>
  createSelector(
    selectGameState(gameId),
    result => result?.data?.nextPlayers ?? []
  );
export const selectTableCards = gameId =>
  createSelector(
    selectGameState(gameId),
    result => result?.data?.tableCards ?? []
  );
export const selectPlayerState = gameId =>
  createSelector(
    selectGameState(gameId),
    (_rootState, playerName) => playerName,
    (gameState, playerName) =>
      gameState?.data?.playerStates?.find(ps => ps.playerName === playerName) ??
      []
  );

export const {
  useGetPokaStateQuery,
  useOpenPokaTableMutation,
  useRestartGameMutation,
  useSetGameVariantMutation,
  useBetMutation,
  useDenyCardMutation,
  useSelectCardsMutation,
  useAssignJokerMutation,
  useEvaluateHandMutation,
  useSubmitCardsMutation,
  useRenewCavaMutation,
  useNextRoundMutation,
  useRevealCardsMutation,
  useJoinTableMutation,
  useSitDownMutation,
  useSitOutMutation,
} = pokaApi;
