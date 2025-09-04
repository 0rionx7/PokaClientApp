import { createSelector } from '@reduxjs/toolkit';

import { selectUserName } from '@account/api/accountApi';
import { baseUrl, gameApi, socket } from '@store/gameApi';
import { selectGameId, selectToken } from '@account/slice/accountSlice';
import { playerStateOf, isSitting, updateAll } from '@utils/helper-functions';

export const pokaApi = gameApi.injectEndpoints({
  endpoints: (build) => ({
    getPokaState: build.query({
      queryFn: async (_, { getState }) => {
        const token = selectToken(getState());
        const gameId = selectGameId(getState());

        if (!token) return { error: 'not authorized' };

        const httpHeaders = {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        };
        const headers = new Headers(httpHeaders);
        const url = new URL(`${baseUrl}/poka/${gameId}`);
        url.search = new URLSearchParams({ socketId: socket.id });
        const response = await fetch(url, { method: 'GET', headers });

        const responseData = await response.json();
        if (!response.ok) throw Error(responseData);

        return { data: responseData };
      },
      async onCacheEntryAdded(
        _,
        { cacheEntryRemoved, updateCachedData, getState }
      ) {
        const gameId = selectGameId(getState());
        try {
          const stateUpdateListener = (stateUpdate) => {
            if (gameId !== stateUpdate._id) return;
            updateCachedData((draft) => ({ ...draft, ...stateUpdate }));
          };

          const closingBetListener = ({ _id, playerStates }) => {
            if (gameId !== _id) return;
            const updatedStates = updateAll(playerStates, { denying: 0 });
            updateCachedData((draft) => ({
              ...draft,
              playerStates: updatedStates,
            }));
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
      query: (openTableData) => ({
        url: '/poka',
        method: 'POST',
        body: { openTableData },
      }),
    }),
    restartGame: build.mutation({
      query: (gameInfo) => ({
        url: '/poka/restart',
        method: 'POST',
        body: gameInfo,
      }),
    }),
    setGameVariant: build.mutation({
      query: (builderConfig) => ({
        url: '/poka/variant',
        method: 'PATCH',
        body: builderConfig,
      }),
    }),
    bet: build.mutation({
      query: (betInfo) => ({
        url: '/poka/bet',
        method: 'PATCH',
        body: betInfo,
      }),
    }),
    denyCard: build.mutation({
      query: (denyInfo) => ({
        url: '/poka/deny',
        method: 'PATCH',
        body: denyInfo,
      }),
    }),
    selectCards: build.mutation({
      query: (selectInfo) => ({
        url: '/poka/select',
        method: 'PATCH',
        body: selectInfo,
      }),
    }),
    assignJoker: build.mutation({
      query: (replacmentCards) => ({
        url: '/poka/replace-joker',
        method: 'PATCH',
        body: replacmentCards,
      }),
    }),
    evaluateHand: build.mutation({
      query: (handInfo) => ({
        url: '/poka/evaluate',
        method: 'POST',
        body: handInfo,
      }),
    }),
    submitCards: build.mutation({
      query: (handInfo) => ({
        url: '/poka/submit',
        method: 'PATCH',
        body: handInfo,
      }),
    }),
    revealCards: build.mutation({
      query: (_) => ({
        url: '/poka/reveal',
        method: 'PATCH',
      }),
    }),
    renewCava: build.mutation({
      query: (renewInfo) => ({
        url: '/poka/renew',
        method: 'PATCH',
        body: renewInfo,
      }),
    }),
    nextRound: build.mutation({
      query: (_) => ({
        url: '/poka/nextRound',
        method: 'PATCH',
      }),
    }),
    sitDown: build.mutation({
      query: (tableinfo) => ({
        url: '/poka/sitDown',
        method: 'PATCH',
        body: tableinfo,
      }),
    }),
    sitOut: build.mutation({
      query: (sitOutInfo) => ({
        url: '/poka/sitOut',
        method: 'PATCH',
        body: sitOutInfo,
      }),
    }),
    joinTable: build.mutation({
      query: (joinInfo) => ({
        url: '/poka/join',
        method: 'PATCH',
        body: joinInfo,
      }),
      invalidatesTags: ['Requests'],
    }),
  }),
});

const selectGameState = pokaApi.endpoints.getPokaState.select();
export const selectPlayerStates = createSelector(
  selectGameState,
  ({ data }) => data.playerStates ?? []
);
export const selectSittingPlayers = createSelector(
  selectPlayerStates,
  (playerStates) => playerStates.filter(isSitting) ?? []
);
export const selectSittingPlayersWithMoney = createSelector(
  selectPlayerStates,
  (playerStates) =>
    playerStates.filter((state) => state.resta > 0 && !state.sittingOut) ?? []
);
export const selectHostPlayerState = createSelector(
  [selectPlayerStates, selectUserName],
  (playerStates, playerName) =>
    playerStates.find(playerStateOf(playerName)) ?? null
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
