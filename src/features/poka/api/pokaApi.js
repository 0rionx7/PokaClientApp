import { playerEntry, updateAll } from '@utils/utilities-functions';
import { setHandCards, setTableCards } from '@poka/slice/pokaStateSlice';
import { baseUrl, gameApi, socket } from '@store/gameApi';

export const pokaApi = gameApi.injectEndpoints({
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
    openPokaTable: build.mutation({
      query: openTableData => ({
        url: '/poka',
        method: 'POST',
        body: { openTableData, socketId: socket.id },
      }),
    }),
    restartGame: build.mutation({
      query: gameInfo => ({
        url: '/poka/restart',
        method: 'POST',
        body: { ...gameInfo, socketId: socket.id },
      }),
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
  }),
});

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
  useLogOutAllMutation,
} = pokaApi;
