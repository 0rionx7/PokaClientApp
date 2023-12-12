import { gameStateApi, socket } from 'features/gameState/gameStateApi';

export const requestsApi = gameStateApi.injectEndpoints({
  endpoints: build => ({
    getRequests: build.query({
      query: tableName => `/requests/${tableName}`,
      async onCacheEntryAdded(
        _arg,
        { cacheEntryRemoved, cacheDataLoaded, updateCachedData }
      ) {
        try {
          await cacheDataLoaded;
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
          // dealers screen requests handlers=======================
          socket.on('requestAdded', requestAddedListener);
          socket.on('requestCanceled', requestRemovedListener);
          await cacheEntryRemoved;
          socket.off('requestAdded', requestAddedListener);
          socket.off('requestCanceled', requestRemovedListener);
        } catch (error) {
          console.log(error);
        }
      },
      keepUnusedDataFor: 0,
    }),
    requestJoin: build.mutation({
      query: requestInfo => ({
        url: '/requests/join',
        method: 'PATCH',
        body: {
          ...requestInfo,
          socketId: socket.id,
        },
      }),
    }),
    cancelRequest: build.mutation({
      query: cancelInfo => ({
        url: '/requests/cancel',
        method: 'PATCH',
        body: cancelInfo,
      }),
    }),
    rejectRequest: build.mutation({
      query: rejectlInfo => ({
        url: '/requests/reject',
        method: 'PATCH',
        body: rejectlInfo,
      }),
    }),
  }),
});

export const {
  useGetRequestsQuery,
  useRequestJoinMutation,
  useCancelRequestMutation,
  useRejectRequestMutation,
} = requestsApi;
