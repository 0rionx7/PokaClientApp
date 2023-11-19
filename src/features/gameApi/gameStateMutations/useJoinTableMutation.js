import {
  ERROR_RESPONSE,
  UNAUTHORISED_REQUEST_ERROR,
} from 'src/common/text-constants';
import { baseUrl, gameApi } from '../gameApi';

export const { useJoinTableMutation, endpoints: joinTableEndpoint } =
  gameApi.injectEndpoints({
    endpoints: build => ({
      joinTable: build.mutation({
        queryFn: async ({ playerName, socketId }, { getState }) => {
          const { token } = getState().auth;
          const headers = new Headers({ 'Content-type': 'application/json' });
          if (token) headers.set('authorization', `Bearer ${token}`);
          else return UNAUTHORISED_REQUEST_ERROR;

          const { gameId } = getState().gameState;
          const { data } =
            getState().gameApi.queries[`getGameState("${gameId}")`];
          if (data.playersStateList.length === 8)
            return {
              status: 500,
              statusText: 'έχει συμπληρωθεί το καρέ',
              data: 'έχει συμπληρωθεί το καρέ',
            };

          let response;
          try {
            response = await fetch(baseUrl + '/gameState/join', {
              method: 'PATCH',
              body: JSON.stringify({ gameId, playerName, socketId }),
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
