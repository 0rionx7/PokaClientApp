import { setLocalPlayerState } from 'features/gameStateChinese/gameStateSlice';
import { baseUrl, gameStateApi, socket } from 'features/gameState/gameStateApi';
import { playerEntry } from 'utils/utilities-functions';

export const gameStateChineseApi = gameStateApi.injectEndpoints({
  endpoints: build => ({
    getGameStateChinese: build.query({
      query: gameId => {
        return {
          url: `/chinese/${gameId}`,
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
              if (updateBoard?.some(br => (br === username) | (br === 'all'))) {
                const updatedHostState = stateUpdate.playerStates.find(
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
    }),
    getRequestsChinese: build.query({
      query: tableName => `/chinese/requests/${tableName}`,
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
          socket.on('requestChineseAdded', requestAddedListener);
          socket.on('requestChineseCanceled', requestRemovedListener);
          await cacheEntryRemoved;
          socket.off('requestChineseAdded', requestAddedListener);
          socket.off('requestChineseCanceled', requestRemovedListener);
        } catch (error) {
          console.log(error);
        }
      },
      providesTags: ['ChineseRequests'],
    }),
    getTablesChinese: build.query({
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
          response = await fetch(baseUrl + '/chinese/tables  ', {
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

          socket.on('chineseTableCreated', tableCreatedListener);
          socket.on('tableChineseDeleted', tableDeletedListerner);
          await cacheEntryRemoved;
          socket.off('chineseTableCreated', tableCreatedListener);
          socket.off('tableChineseDeleted', tableDeletedListerner);
        } catch (error) {
          console.log(error);
        }
      },
      providesTags: ['ChineseTables'],
    }),
    openTableChinese: build.mutation({
      query: openTableData => ({
        url: 'chinese',
        method: 'POST',
        body: { ...openTableData, socketId: socket.id },
      }),
      invalidatesTags: ['ChineseTables'],
    }),
    joinTableChinese: build.mutation({
      query: joinInfo => ({
        url: 'chinese/join',
        method: 'PATCH',
        body: joinInfo,
      }),
      invalidatesTags: ['ChineseRequests'],
    }),
    rejectRequestChinese: build.mutation({
      query: rejectlInfo => ({
        url: 'chinese/requests/reject',
        method: 'PATCH',
        body: rejectlInfo,
      }),
      invalidatesTags: ['ChineseRequests'],
    }),
    sitDownChinese: build.mutation({
      query: ({ gameId }) => ({
        url: 'chinese/sitDown',
        method: 'PATCH',
        body: { gameId, socketId: socket.id },
      }),
      invalidatesTags: ['ChineseTables'],
    }),
    startGameChinese: build.mutation({
      query: gameId => ({
        url: 'chinese/start',
        method: 'PATCH',
        body: { gameId },
      }),
    }),
    submitCardsChinese: build.mutation({
      query: ({ boardCards, gameId }) => ({
        url: 'chinese/submitCards',
        method: 'PATCH',
        body: { boardCards, gameId },
      }),
    }),
    reorderDeckChinese: build.mutation({
      query: ({ dragIndex, dropIndex, gameId }) => ({
        url: 'chinese/reorderDeck',
        method: 'PATCH',
        body: { dragIndex, dropIndex, gameId },
      }),
    }),
    nextRoundChinese: build.mutation({
      query: gameId => ({
        url: 'chinese/nextRound',
        method: 'PATCH',
        body: { gameId },
      }),
    }),
    timedOut: build.mutation({
      query: gameId => ({
        url: 'chinese/timedOut',
        method: 'PATCH',
        body: { gameId },
      }),
    }),
    restartGameChinese: build.mutation({
      query: gameInfo => ({
        url: 'chinese/restart',
        method: 'POST',
        body: { ...gameInfo, socketId: socket.id },
      }),
    }),
    sitOutChinese: build.mutation({
      query: sitOutInfo => ({
        url: 'chinese/sitOut',
        method: 'PATCH',
        body: { ...sitOutInfo, socketId: socket.id },
      }),
    }),
  }),
});

export const {
  useGetGameStateChineseQuery,
  useGetRequestsChineseQuery,
  useGetTablesChineseQuery,
  useOpenTableChineseMutation,
  useJoinTableChineseMutation,
  useRejectRequestChineseMutation,
  useSitDownChineseMutation,
  useStartGameChineseMutation,
  useSubmitCardsChineseMutation,
  useReorderDeckChineseMutation,
  useNextRoundChineseMutation,
  useTimedOutMutation,
  useRestartGameChineseMutation,
  useSitOutChineseMutation,
} = gameStateChineseApi;
