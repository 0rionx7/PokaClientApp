import {
  ERROR_RESPONSE,
  UNAUTHORISED_REQUEST_ERROR,
} from 'src/common/text-constants';
import { baseUrl, gameApi, socket } from '../gameApi';

export const { useSitOutMutation, endpoints: sitOutEndpoint } =
  gameApi.injectEndpoints({
    endpoints: build => ({
      sitOut: build.mutation({
        queryFn: async (cancelable, { getState }) => {
          const { token } = getState().auth;
          const headers = new Headers({ 'Content-type': 'application/json' });
          if (token) headers.set('authorization', `Bearer ${token}`);
          else return UNAUTHORISED_REQUEST_ERROR;
          const { gameId } = getState().gameState;

          let response;
          try {
            response = await fetch(baseUrl + '/gameState/sitOut', {
              method: 'PATCH',
              body: JSON.stringify({ gameId, socketId: socket.id, cancelable }),
              headers,
            });
          } catch (error) {
            console.log(error);
          }

          const responseData = await response.json();
          if (!response.ok) return ERROR_RESPONSE(responseData);

          return { data: responseData };
        },
        invalidatesTags: ['Tables'],
      }),
    }),
  });
