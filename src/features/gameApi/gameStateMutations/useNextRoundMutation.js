import {
  ERROR_RESPONSE,
  UNAUTHORISED_REQUEST_ERROR,
} from 'common/text-constants';
import { baseUrl, gameApi } from '../gameApi';

export const { useNextRoundMutation } = gameApi.injectEndpoints({
  endpoints: build => ({
    nextRound: build.mutation({
      queryFn: async (_, { getState }) => {
        const { token } = getState().auth;
        const headers = new Headers({ 'Content-type': 'application/json' });
        if (token) headers.set('authorization', `Bearer ${token}`);
        else return UNAUTHORISED_REQUEST_ERROR;
        const { gameId } = getState().gameState;

        let response;
        try {
          response = await fetch(baseUrl + '/gameState/nextRound', {
            method: 'PATCH',
            body: JSON.stringify({ gameId }),
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
