import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import io from 'socket.io-client';

import { playerEntry, updateAll } from 'utils/utilities-functions';
import { setHandCards, setTableCards } from 'poka/slice/pokaStateSlice';

export const baseUrl = import.meta.env.VITE_FRONTEND_URL;
export const socket = io(baseUrl, { transports: ['websocket'] });

export const pokaApi = createApi({
  reducerPath: 'gameApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      headers.set('Content-type', 'application/json');
      const token = getState().account.token;
      if (token) headers.set('authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['User', 'Tables', 'Requests', 'ChineseRequests', 'ChineseTables'],
  endpoints: build => ({
    getPokaState: build.query({
      query: gameId => ({
        url: `/poka/${gameId}`,
        params: { socketId: socket.id },
      }),
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
        const hostPlayerName = getState().account.username;

        function updateLocalHandCards(data) {
          const hostState = data.playerStates.find(playerEntry(hostPlayerName));
          dispatch(setHandCards(hostState.handCards));
        }

        try {
          const { data } = await cacheDataLoaded;
          updateLocalHandCards(data);
          dispatch(setTableCards(data.tableCards));

          const stateUpdateListener = stateUpdate => {
            // because might receive stateUpdate @ player socketId
            if (arg === stateUpdate._id)
              updateCachedData(draft => {
                //for not to reset preselected cards ( players selected before their turn )
                if (!draft.currentPlayerList?.[0]?.selecting?.submit) {
                  if (stateUpdate.playerStates)
                    updateLocalHandCards(stateUpdate);
                  if (stateUpdate.tableCards)
                    dispatch(setTableCards(stateUpdate.tableCards));
                }

                return { ...draft, ...stateUpdate };
              });
          };

          const closingBetListener = ({ _id, playerStates }) => {
            if (arg === _id) {
              playerStates = updateAll(playerStates, { denying: 0 });
              updateCachedData(draft => ({ ...draft, playerStates }));
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
    getPokaRequests: build.query({
      query: tableName => `/requests/${tableName}`,
      async onCacheEntryAdded(
        _arg,
        { cacheEntryRemoved, cacheDataLoaded, updateCachedData }
      ) {
        try {
          await cacheDataLoaded;
          // dealers screen requests handlers=======================
          const requestAddedListener = reqInfo => {
            updateCachedData(draft => {
              draft.push(reqInfo);
            });
          };
          const requestRemovedListener = ({ username }) => {
            updateCachedData(draft =>
              draft.filter(reqInfo => reqInfo.username !== username)
            );
          };
          socket.on('requestAdded', requestAddedListener);
          socket.on('requestCanceled', requestRemovedListener);
          await cacheEntryRemoved;
          socket.off('requestAdded', requestAddedListener);
          socket.off('requestCanceled', requestRemovedListener);
        } catch (error) {
          console.log(error);
        }
      },
      providesTags: ['Requests'],
      keepUnusedDataFor: 0,
    }),
    getPokaTables: build.query({
      queryFn: async (_args, { getState }) => {
        try {
          const token = getState().account.token;
          if (!token) return { data: [] };

          const httpHeaders = {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          };
          const headers = new Headers(httpHeaders);
          const response = await fetch(baseUrl + '/tables  ', {
            method: 'GET',
            headers,
          });

          const responseData = await response.json();
          if (!response.ok) throw Error(responseData);

          return { data: responseData };
        } catch (error) {
          return { error };
        }
      },
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
    openPokaTable: build.mutation({
      query: openTableData => ({
        url: '/poka',
        method: 'POST',
        body: { openTableData, socketId: socket.id },
      }),
      invalidatesTags: ['Tables'],
    }),
    restartGame: build.mutation({
      query: gameInfo => ({
        url: '/poka/restart',
        method: 'POST',
        body: { ...gameInfo, socketId: socket.id },
      }),
      invalidatesTags: ['Tables'],
    }),
    logOutAll: build.mutation({
      query: _ => ({
        url: '/user/logOutAll',
        method: 'PATCH',
        body: {},
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
      query: jokers => ({
        url: '/poka/joker',
        method: 'PATCH',
        body: jokers,
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
      invalidatesTags: ['Tables'],
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
    rejectRequest: build.mutation({
      query: rejectlInfo => ({
        url: '/requests/reject',
        method: 'PATCH',
        body: rejectlInfo,
      }),
      invalidatesTags: ['Requests'],
    }),
  }),
});

export const {
  useGetPokaStateQuery,
  useGetPokaRequestsQuery,
  useGetPokaTablesQuery,
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
  useLogOutAllMutation,
  useRejectRequestMutation,
} = pokaApi;
