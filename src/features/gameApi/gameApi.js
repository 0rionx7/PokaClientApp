import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createAction } from '@reduxjs/toolkit';
import io from 'socket.io-client';

import { playerEntry, updateAll } from 'common/utilities-functions';

export const baseUrl = process.env.REACT_APP_POKA_API;
export const socket = io(baseUrl, { transports: ['websocket'] });

// for avoiding circular dependency (can't access gameApi before initialization bug)
const removeRequest = createAction('gameState/removeRequest');
const setHandCards = createAction('gameState/setHandCards');
const setTableCards = createAction('gameState/setTableCards');

export const gameApi = createApi({
  reducerPath: 'gameApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) headers.set('authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['User', 'Tables'],
  endpoints: build => ({
    getGameState: build.query({
      query: gameId => `/gameState/${gameId}`,
      keepUnusedDataFor: 1,
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
          const { gameId } = getState().gameState;

          const stateUpdateListener = stateUpdate => {
            // because might receive stateUpdate @ player socketId
            if (gameId === stateUpdate._id)
              updateCachedData(draft => {
                //for not to reset preselected cards ( players selected before their round )
                if (!draft.currentPlayerStateList?.[0]?.selecting?.submit) {
                  if (stateUpdate.playersStateList) {
                    const hostPlayerName = getState().auth.username;
                    const updatedHostState = stateUpdate.playersStateList.find(
                      playerEntry(hostPlayerName)
                    );
                    dispatch(setHandCards(updatedHostState.handCards));
                  }
                  if (stateUpdate.tableCards)
                    dispatch(setTableCards(stateUpdate.tableCards));
                }

                return { ...draft, ...stateUpdate };
              });
          };

          const closingBetListener = ({ _id, playersStateList }) => {
            if (gameId === _id) {
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
        { dispatch, cacheEntryRemoved, cacheDataLoaded, updateCachedData }
      ) {
        try {
          await cacheDataLoaded;
          const tableCreatedListener = ({ tableName }) => {
            updateCachedData(draft => {
              draft.push({ tableName });
            });
          };
          const tableDeletedListerner = tableName => {
            dispatch(
              gameApi.endpoints.getTables.initiate(undefined, {
                forceRefetch: true,
              })
            );
            dispatch(removeRequest(tableName));
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
    bet: build.mutation({
      query: betInfo => ({
        url: '/gameState/bet',
        method: 'PATCH',
        body: betInfo,
      }),
    }),
    cancelRequest: build.mutation({
      query: cancelInfo => ({
        url: '/gameState/cancelRequest',
        method: 'PATCH',
        body: cancelInfo,
      }),
    }),
    denyCard: build.mutation({
      query: denyInfo => ({
        url: '/gameState/deny',
        method: 'PATCH',
        body: denyInfo,
      }),
    }),
    nextRound: build.mutation({
      query: gameId => ({
        url: '/gameState/nextRound',
        method: 'PATCH',
        body: { gameId },
      }),
    }),
    sitOut: build.mutation({
      query: sitOutInfo => ({
        url: '/gameState/sitOut',
        method: 'PATCH',
        body: { ...sitOutInfo, socketId: socket.id },
      }),
    }),
    restartGame: build.mutation({
      query: gameInfo => ({
        url: '/gameState/restart',
        method: 'POST',
        body: { ...gameInfo, socketId: socket.id },
      }),
    }),
    renewCava: build.mutation({
      query: renewInfo => ({
        url: '/gameState/renew',
        method: 'PATCH',
        body: renewInfo,
      }),
    }),
    setGameVariant: build.mutation({
      query: gameInfo => ({
        url: '/gameState/variant',
        method: 'PATCH',
        body: gameInfo,
      }),
    }),
    selectCards: build.mutation({
      query: selectInfo => ({
        url: '/gameState/select',
        method: 'PATCH',
        body: selectInfo,
      }),
    }),
    requestJoin: build.mutation({
      query: requestInfo => ({
        url: '/gameState/requestJoin',
        method: 'PATCH',
        body: {
          ...requestInfo,
          socketId: socket.id,
        },
      }),
    }),
    joinTable: build.mutation({
      query: joinInfo => ({
        url: '/gameState/join',
        method: 'PATCH',
        body: joinInfo,
      }),
    }),
    evaluateHand: build.mutation({
      query: handInfo => ({
        url: '/gameState/evaluate',
        method: 'POST',
        body: handInfo,
      }),
    }),
  }),
});

export const {
  useGetGameStateQuery,
  useGetTablesQuery,
  useBetMutation,
  useCancelRequestMutation,
  useDenyCardMutation,
  useNextRoundMutation,
  useSitOutMutation,
  useRestartGameMutation,
  useOpenTableMutation,
  useRenewCavaMutation,
  useSetGameVariantMutation,
  useSelectCardsMutation,
  useRequestJoinMutation,
  useJoinTableMutation,
  useEvaluateHandMutation,
} = gameApi;

export const gameApiReducer = gameApi.reducer;
