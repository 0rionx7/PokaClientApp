import {
  ERROR_RESPONSE,
  UNAUTHORISED_REQUEST_ERROR,
} from 'common/text-constants';
import { selectedCardsIndexes } from 'common/utilities-functions';
import { baseUrl, gameApi } from '../gameApi';

export const { useSelectCardsMutation } = gameApi.injectEndpoints({
  endpoints: build => ({
    selectCards: build.mutation({
      queryFn: async (selectionInfo, { getState }) => {
        const { token } = getState().auth;
        const headers = new Headers({ 'Content-type': 'application/json' });
        if (token) headers.set('authorization', `Bearer ${token}`);
        else return UNAUTHORISED_REQUEST_ERROR;

        const { gameId, handCards } = getState().gameState;
        const selectedHandCardsIndexes = selectedCardsIndexes(handCards);

        let response;
        try {
          response = await fetch(baseUrl + '/gameState/select', {
            method: 'PATCH',
            body: JSON.stringify({
              gameId,
              selectionInfo,
              selectedHandCardsIndexes,
            }),
            headers,
          });
        } catch (error) {
          console.log(error);
        }

        const responseData = await response.json();
        if (!response.ok) return ERROR_RESPONSE(responseData);

        return { data: responseData };
      },
    }),
  }),
});
