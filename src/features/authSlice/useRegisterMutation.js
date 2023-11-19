import { baseUrl, gameApi, socket } from 'features/gameApi/gameApi';
import { ERROR_RESPONSE } from 'common/text-constants';

export const { useRegisterMutation, endpoints: registerEndpoint } =
  gameApi.injectEndpoints({
    endpoints: build => ({
      register: build.mutation({
        queryFn: async (userData, _api, _extraOptions) => {
          let response;
          try {
            response = await fetch(baseUrl + '/user/register', {
              method: 'PUT',
              body: JSON.stringify({ ...userData, socketId: socket.id }),
              headers: new Headers({ 'Content-type': 'application/json' }),
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
