import {
  ERROR_RESPONSE,
  UNAUTHORISED_REQUEST_ERROR,
} from 'src/common/text-constants';
import { baseUrl, gameApi, socket } from '../gameApi';

export const { useRestartGameMutation } = gameApi.injectEndpoints({
  endpoints: build => ({
    restartGame: build.mutation({
      queryFn: async (savedGame, { getState }) => {
        const { token } = getState().auth;
        const headers = new Headers({ 'Content-type': 'application/json' });
        if (token) headers.set('authorization', `Bearer ${token}`);
        else return UNAUTHORISED_REQUEST_ERROR;

        let response;
        try {
          response = await fetch(baseUrl + '/gameState/restart', {
            method: 'POST',
            body: JSON.stringify({ ...savedGame, socketId: socket.id }),
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
