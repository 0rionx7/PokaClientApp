import {
  ERROR_RESPONSE,
  UNAUTHORISED_REQUEST_ERROR,
} from 'src/common/text-constants';
import { baseUrl, gameApi } from '../gameApi';
import { isMirror, selectedCardsIndexes } from 'src/common/utilities-functions';
import { gameNames } from 'src/common/text-constants';

export const { useSubmitCardsMutation } = gameApi.injectEndpoints({
  endpoints: build => ({
    submitCards: build.mutation({
      queryFn: async (_, { getState }) => {
        const { gameId, tableCards, handCards } = getState().gameState;
        const { data } =
          getState().gameApi.queries[`getGameState("${gameId}")`];
        const submittedHandCardsIndexes = selectedCardsIndexes(handCards);
        const submittedTableCardsIndexes = selectedCardsIndexes(tableCards);
        if (
          submittedHandCardsIndexes.concat(submittedTableCardsIndexes)
            .length !== 5 &&
          data.gameName !== gameNames.GRAVEYARD &&
          !(
            data.gameName === gameNames.MAMUT && isMirror(tableCards, handCards)
          )
        )
          return {
            error: {
              status: 400,
              statusText: 'λάθος υποβολή',
              data: 'διαλέξτε ακριβώς 5 χαρτιά',
            },
          };

        const { token } = getState().auth;
        const headers = new Headers({ 'Content-type': 'application/json' });
        if (token) headers.set('authorization', `Bearer ${token}`);
        else return UNAUTHORISED_REQUEST_ERROR;

        let response;
        try {
          response = await fetch(baseUrl + '/gameState/submit', {
            method: 'PATCH',
            body: JSON.stringify({
              gameId,
              submittedHandCardsIndexes,
              submittedTableCardsIndexes,
            }),
            headers,
          });
        } catch (error) {
          console.dir(error);
        }

        const responseData = await response.json();
        if (!response.ok) return ERROR_RESPONSE(responseData);

        return { data: responseData };
      },
    }),
  }),
});
