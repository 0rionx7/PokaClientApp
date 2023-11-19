import { baseUrl, gameApi, socket } from 'features/gameApi/gameApi';
import { ERROR_RESPONSE } from 'common/text-constants';

export const { useLogOutMutation, endpoints: logOutEndpoint } =
  gameApi.injectEndpoints({
    endpoints: build => ({
      logOut: build.mutation({
        queryFn: async () => {
          let response;
          try {
            response = await fetch(baseUrl + '/user/logOut', {
              method: 'POST',
              body: JSON.stringify({ socketId: socket.id }),
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
