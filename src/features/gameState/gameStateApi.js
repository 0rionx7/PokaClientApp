import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import io from 'socket.io-client';

import { playerEntry, updateAll } from 'common/utilities-functions';
import {
  resetJoker,
  setHandCards,
  setHasNexted,
  setTableCards,
} from 'features/gameState/gameStateSlice';

export const baseUrl = process.env.REACT_APP_POKA_API;
export const socket = io(baseUrl, { transports: ['websocket'] });

export const gameStateApi = createApi({
  reducerPath: 'gameStateApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().account.token;
      if (token) headers.set('authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['User', 'Tables'],
  endpoints: build => ({
    getGameState: build.query({
      query: gameId => {
        return { url: `/gameState/${gameId}`, params: { socketId: socket.id } };
      },
      keepUnusedDataFor: 0,
      async onCacheEntryAdded( // i.e after a component has created a new subscription to the given endpoint+params combination
        arg,
        {
          dispatch,
          getState,
          cacheEntryRemoved,
          cacheDataLoaded,
          updateCachedData, // available for query endpoints only
        }
      ) {
        if (!arg) return;
        try {
          await cacheDataLoaded;

          const stateUpdateListener = stateUpdate => {
            // because might receive stateUpdate @ player socketId
            if (arg === stateUpdate._id)
              updateCachedData(draft => {
                //for not to reset preselected cards ( players selected before their turn )
                if (!draft.currentPlayerList?.[0]?.selecting?.submit) {
                  if (stateUpdate.playersStateList) {
                    const hostPlayerName = getState().account.username;
                    const updatedHostState = stateUpdate.playersStateList.find(
                      playerEntry(hostPlayerName)
                    );
                    dispatch(setHandCards(updatedHostState.handCards));
                  }
                  if (stateUpdate.tableCards)
                    dispatch(setTableCards(stateUpdate.tableCards));
                  if (stateUpdate.gameName) {
                    dispatch(setHasNexted(false));
                    dispatch(resetJoker());
                  }
                }

                return { ...draft, ...stateUpdate };
              });
          };

          const closingBetListener = ({ _id, playersStateList }) => {
            if (arg === _id) {
              playersStateList = updateAll(playersStateList, { denying: 0 });
              updateCachedData(draft => ({ ...draft, playersStateList }));
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
    }),
    getTables: build.query({
      query: () => 'tables',
      providesTags: ['Tables'],
      async onCacheEntryAdded(
        _arg,
        { cacheEntryRemoved, cacheDataLoaded, updateCachedData }
      ) {
        try {
          await cacheDataLoaded;
          const tableCreatedListener = tableInfo => {
            updateCachedData(draft => {
              draft.push(tableInfo);
            });
          };
          const tableDeletedListerner = deletedTable => {
            updateCachedData(draft =>
              draft.filter(({ tableName }) => tableName !== deletedTable)
            );
          };

          socket.on('tableCreated', tableCreatedListener);
          socket.on('tableDeleted', tableDeletedListerner);
          await cacheEntryRemoved;
          socket.off('tableCreated', tableCreatedListener);
          socket.off('tableDeleted', tableDeletedListerner);
        } catch (error) {
          console.log(error);
        }
      },
    }),
    openTable: build.mutation({
      query: openTableData => ({
        url: '/gameState',
        method: 'POST',
        body: { openTableData, socketId: socket.id },
      }),
    }),
    restartGame: build.mutation({
      query: gameInfo => ({
        url: '/gameState/restart',
        method: 'POST',
        body: { ...gameInfo, socketId: socket.id },
      }),
    }),
    logOutAll: build.mutation({
      query: _ => ({
        url: '/user/logOutAll',
        method: 'PATCH',
      }),
    }),
    setGameVariant: build.mutation({
      query: gameInfo => ({
        url: '/gameState/variant',
        method: 'PATCH',
        body: gameInfo,
      }),
    }),
    bet: build.mutation({
      query: betInfo => ({
        url: '/gameState/bet',
        method: 'PATCH',
        body: betInfo,
      }),
    }),
    denyCard: build.mutation({
      query: denyInfo => ({
        url: '/gameState/deny',
        method: 'PATCH',
        body: denyInfo,
      }),
    }),
    selectCards: build.mutation({
      query: selectInfo => ({
        url: '/gameState/select',
        method: 'PATCH',
        body: selectInfo,
      }),
    }),
    assignJoker: build.mutation({
      query: jokers => ({
        url: '/gameState/joker',
        method: 'PATCH',
        body: jokers,
      }),
    }),
    evaluateHand: build.mutation({
      query: handInfo => ({
        url: '/gameState/evaluate',
        method: 'POST',
        body: handInfo,
      }),
    }),
    submitCards: build.mutation({
      query: handInfo => ({
        url: '/gameState/submit',
        method: 'PATCH',
        body: handInfo,
      }),
    }),
    renewCava: build.mutation({
      query: renewInfo => ({
        url: '/gameState/renew',
        method: 'PATCH',
        body: renewInfo,
      }),
    }),
    nextRound: build.mutation({
      query: gameId => ({
        url: '/gameState/nextRound',
        method: 'PATCH',
        body: { gameId },
      }),
    }),
    joinTable: build.mutation({
      query: joinInfo => ({
        url: '/gameState/join',
        method: 'PATCH',
        body: joinInfo,
      }),
    }),
    sitDown: build.mutation({
      query: ({ gameId }) => ({
        url: '/gameState/sitDown',
        method: 'PATCH',
        body: {
          gameId,
          socketId: socket.id,
        },
      }),
    }),
    sitOut: build.mutation({
      query: sitOutInfo => ({
        url: '/gameState/sitOut',
        method: 'PATCH',
        body: { ...sitOutInfo, socketId: socket.id },
      }),
    }),
  }),
});

export const {
  useGetGameStateQuery,
  useGetTablesQuery,
  useOpenTableMutation,
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
  useJoinTableMutation,
  useSitDownMutation,
  useSitOutMutation,
  useLogOutAllMutation,
} = gameStateApi;

export const gameApiReducer = gameStateApi.reducer;
