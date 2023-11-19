import {
  ERROR_RESPONSE,
  UNAUTHORISED_REQUEST_ERROR,
} from 'src/common/text-constants';
import { baseUrl, gameApi } from '../gameApi';

export const { useCancelRequestMutation, endpoints: cancelRequestEndpoint } =
  gameApi.injectEndpoints({
    endpoints: build => ({
      cancelRequest: build.mutation({
        queryFn: async (cancelInfo, { getState }) => {
          const { token } = getState().auth;
          const headers = new Headers({ 'Content-type': 'application/json' });
          if (token) headers.set('authorization', `Bearer ${token}`);
          else return UNAUTHORISED_REQUEST_ERROR;

          let response;
          try {
            response = await fetch(baseUrl + '/gameState/cancelRequest', {
              method: 'PATCH',
              body: JSON.stringify(cancelInfo),
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
