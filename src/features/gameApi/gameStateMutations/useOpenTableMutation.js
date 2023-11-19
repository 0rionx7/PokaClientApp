import {
  ERROR_RESPONSE,
  UNAUTHORISED_REQUEST_ERROR,
} from 'common/text-constants';
import { baseUrl, socket, gameApi } from '../gameApi';

export const { useOpenTableMutation, endpoints: openTableEndpoint } =
  gameApi.injectEndpoints({
    endpoints: build => ({
      openTable: build.mutation({
        queryFn: async (openTableData, { getState }) => {
          const { token } = getState().auth;
          const headers = new Headers({ 'Content-type': 'application/json' });
          if (token) headers.set('authorization', `Bearer ${token}`);
          else return UNAUTHORISED_REQUEST_ERROR;

          let response;
          try {
            response = await fetch(baseUrl + '/gameState', {
              method: 'POST',
              body: JSON.stringify({ openTableData, socketId: socket.id }),
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
