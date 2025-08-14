import { setLocalPlayerState } from '@chinese/slice/chineseStateSlice';
import { gameApi, socket } from '@store/gameApi';
import { isPlayerState } from '@utils/helper-functions';

export const chineseApi = gameApi.injectEndpoints({
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
                  isPlayerState(username)
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
    openChineseTable: build.mutation({
      query: openTableData => ({
        url: 'chinese',
        method: 'POST',
        body: { ...openTableData, socketId: socket.id },
      }),
    }),
    joinChineseTable: build.mutation({
      query: joinInfo => ({
        url: 'chinese/join',
        method: 'PATCH',
        body: joinInfo,
      }),
      invalidatesTags: ['ChineseRequests'],
    }),
    sitDownChinese: build.mutation({
      query: ({ gameId }) => ({
        url: 'chinese/sitDown',
        method: 'PATCH',
        body: { gameId, socketId: socket.id },
      }),
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
  useOpenChineseTableMutation,
  useJoinChineseTableMutation,
  useSitDownChineseMutation,
  useStartChineseGameMutation,
  useSubmitCardsChineseMutation,
  useReorderDeckMutation,
  useNextRoundChineseMutation,
  useTimedOutMutation,
  useSitOutChineseMutation,
} = chineseApi;
