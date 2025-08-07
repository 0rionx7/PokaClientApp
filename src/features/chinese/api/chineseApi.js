import { setLocalPlayerState } from 'chinese/slice/chineseStateSlice';
import { baseUrl, pokaApi, socket } from 'poka/api/pokaApi';
import { playerEntry } from 'utils/utilities-functions';

export const chineseApi = pokaApi.injectEndpoints({
  endpoints: build => ({
    getChineseState: build.query({
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
          socket.on('chineseStateUpdated', stateUpdateListener);

          await cacheEntryRemoved;
          socket.off('chineseStateUpdated', stateUpdateListener);
        } catch (error) {
          console.log(error);
        }
      },
      keepUnusedDataFor: 0,
    }),
    getChineseRequests: build.query({
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
    getChineseTables: build.query({
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
    openChineseTable: build.mutation({
      query: openTableData => ({
        url: 'chinese',
        method: 'POST',
        body: { ...openTableData, socketId: socket.id },
      }),
      invalidatesTags: ['ChineseTables'],
    }),
    joinChineseTable: build.mutation({
      query: joinInfo => ({
        url: 'chinese/join',
        method: 'PATCH',
        body: joinInfo,
      }),
      invalidatesTags: ['ChineseRequests'],
    }),
    rejectChineseRequest: build.mutation({
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
    startChineseGame: build.mutation({
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
    reorderDeck: build.mutation({
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
  useGetChineseStateQuery,
  useGetChineseRequestsQuery,
  useGetChineseTablesQuery,
  useOpenChineseTableMutation,
  useJoinChineseTableMutation,
  useRejectChineseRequestMutation,
  useSitDownChineseMutation,
  useStartChineseGameMutation,
  useSubmitCardsChineseMutation,
  useReorderDeckMutation,
  useNextRoundChineseMutation,
  useTimedOutMutation,
  useSitOutChineseMutation,
} = chineseApi;
