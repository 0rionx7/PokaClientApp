import { createSelector } from '@reduxjs/toolkit';

import { selectGameId, selectToken } from '@account/slice/accountSlice';
import { setLocalPlayerState } from '@chinese/slice/chineseStateSlice';
import { selectUserName } from '@account/api/accountApi';
import { baseUrl, gameApi, socket } from '@store/gameApi';
import { isPlayerState } from '@utils/helper-functions';

export const chineseApi = gameApi.injectEndpoints({
  endpoints: build => ({
    getChineseState: build.query({
      queryFn: async (_arg, { getState }) => {
        const token = selectToken(getState());
        const gameId = selectGameId(getState());

        if (!token) return { error: 'not authorized' };

        const httpHeaders = {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        };
        const headers = new Headers(httpHeaders);
        const url = new URL(`${baseUrl}/chinese/${gameId}`);
        url.search = new URLSearchParams({ socketId: socket.id });
        const response = await fetch(url, { method: 'GET', headers });

        const responseData = await response.json();
        if (!response.ok) throw Error(responseData);

        return { data: responseData };
      },
      async onCacheEntryAdded( // i.e after a component has created a new subscription to the given endpoint+params combination
        _arg,
        {
          dispatch,
          getState,
          cacheEntryRemoved,
          cacheDataLoaded,
          updateCachedData, // available for query endpoints only
        }
      ) {
        try {
          await cacheDataLoaded;
          const stateUpdateListener = (stateUpdate, updateBoard) => {
            updateCachedData(_draft => {
              const username = selectUserName(getState());
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
    }),
    openChineseTable: build.mutation({
      query: openTableData => ({
        url: 'chinese',
        method: 'POST',
        body: { ...openTableData },
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
        body: { gameId },
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
      query: boardCards => ({
        url: 'chinese/submitCards',
        method: 'PATCH',
        body: boardCards,
      }),
    }),
    reorderDeck: build.mutation({
      query: reorderInfo => ({
        url: 'chinese/reorderDeck',
        method: 'PATCH',
        body: reorderInfo,
      }),
    }),
    nextRoundChinese: build.mutation({
      query: _ => ({
        url: 'chinese/nextRound',
        method: 'PATCH',
      }),
    }),
    timedOut: build.mutation({
      query: _ => ({
        url: 'chinese/timedOut',
        method: 'PATCH',
      }),
    }),
    sitOutChinese: build.mutation({
      query: sitOutInfo => ({
        url: 'chinese/sitOut',
        method: 'PATCH',
        body: sitOutInfo,
      }),
    }),
  }),
});

const selectGameState = chineseApi.endpoints.getChineseState.select();
export const selectPlayerStates = createSelector(
  selectGameState,
  ({ data }) => data.playerStates ?? []
);
export const selectHostPlayerState = createSelector(
  [selectPlayerStates, selectUserName],
  (playerStates, playerName) =>
    playerStates.find(isPlayerState(playerName)) ?? null
);

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
