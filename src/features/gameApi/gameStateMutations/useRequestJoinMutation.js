import {
  ERROR_RESPONSE,
  UNAUTHORISED_REQUEST_ERROR,
} from 'src/common/text-constants';
import { baseUrl, gameApi, socket } from '../gameApi';

export const { useRequestJoinMutation, endpoints: requestJoinEndpoint } =
  gameApi.injectEndpoints({
    endpoints: build => ({
      requestJoin: build.mutation({
        queryFn: async (requestInfo, { getState }) => {
          const requestsCount = getState().gameState.joinRequests.length;
          if (requestsCount >= 3)
            return {
              error: {
                status: 401,
                statusText: 'Υπέρβαση ορίου',
                data: 'Έχετε συμπληρώσει των μέγιστο αριθμό αιτήσεων.',
              },
            };
          const { token } = getState().auth;
          const headers = new Headers({ 'Content-type': 'application/json' });
          if (token) headers.set('authorization', `Bearer ${token}`);
          else return UNAUTHORISED_REQUEST_ERROR;

          let response;
          try {
            response = await fetch(baseUrl + '/gameState/requestJoin', {
              method: 'PATCH',
              body: JSON.stringify({
                ...requestInfo,
                socketId: socket.id,
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
