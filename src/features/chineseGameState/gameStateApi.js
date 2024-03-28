import { setLocalPlayerState } from 'features/chineseGameState/gameStateSlice';
import { baseUrl, gameStateApi, socket } from 'features/gameState/gameStateApi';
import { playerEntry } from 'utils/utilities-functions';

export const chineseGameStateApi = gameStateApi.injectEndpoints({
  endpoints: build => ({
    getGameState: build.query({
      query: gameId => {
        return {
          url: `/chiinese/gameState/${gameId}`,
          params: { socketId: socket.id },
        };
      },
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
          const stateUpdateListener = (stateUpdate, updateBoard) => {
            updateCachedData(_draft => {
              const { username } = getState().account;
              if (['all', username].includes(updateBoard)) {
                const updatedHostState = stateUpdate.playersStateList.find(
                  playerEntry(username)
                );
                dispatch(setLocalPlayerState(updatedHostState));
              }
              return stateUpdate;
            });
          };
          socket.on('stateUpdated', stateUpdateListener);

          await cacheEntryRemoved;
          socket.off('stateUpdated', stateUpdateListener);
        } catch (error) {
          console.log(error);
        }
      },
      keepUnusedDataFor: 0,
    }),
    getRequests: build.query({
      query: tableName => `/chiinese/requests/${tableName}`,
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
      providesTags: ['ChineseRequests'],
      keepUnusedDataFor: 0,
    }),
    getTables: build.query({
      queryFn: async (_args, { getState }) => {
        try {
          const token = getState().account.token;
          if (!token) return { data: [] };

          const httpHeaders = {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          };
          const headers = new Headers(httpHeaders);
          let response;
          response = await fetch(baseUrl + 'chiinese/tables  ', {
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
      providesTags: ['ChineseTables'],
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
        url: 'chiinese/gameState',
        method: 'POST',
        body: { ...openTableData, socketId: socket.id },
      }),
    }),
    joinTable: build.mutation({
      query: joinInfo => ({
        url: 'chiinese/gameState/join',
        method: 'PATCH',
        body: joinInfo,
      }),
    }),
    sitDown: build.mutation({
      query: ({ gameId }) => ({
        url: 'chiinese/gameState/sitDown',
        method: 'PATCH',
        body: { gameId, socketId: socket.id },
      }),
    }),
    startGame: build.mutation({
      query: gameId => ({
        url: 'chiinese/gameState/start',
        method: 'PATCH',
        body: { gameId },
      }),
    }),
    submitCards: build.mutation({
      query: ({ boardCards, gameId }) => ({
        url: 'chiinese/gameState/submitCards',
        method: 'PATCH',
        body: { boardCards, gameId },
      }),
    }),
    nextRound: build.mutation({
      query: gameId => ({
        url: 'chiinese/gameState/nextRound',
        method: 'PATCH',
        body: { gameId },
      }),
    }),
    timedOut: build.mutation({
      query: gameId => ({
        url: 'chiinese/gameState/timedOut',
        method: 'PATCH',
        body: { gameId },
      }),
    }),

    restartGame: build.mutation({
      query: gameInfo => ({
        url: 'chiinese/gameState/restart',
        method: 'POST',
        body: { ...gameInfo, socketId: socket.id },
      }),
    }),
    sitOut: build.mutation({
      query: sitOutInfo => ({
        url: 'chiinese/gameState/sitOut',
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
  useStartGameMutation,
  useSubmitCardsMutation,
  useNextRoundMutation,
  useJoinTableMutation,
  useSitDownMutation,
  useTimedOutMutation,
  useRestartGameMutation,
  useSitOutMutation,
} = chineseGameStateApi;
