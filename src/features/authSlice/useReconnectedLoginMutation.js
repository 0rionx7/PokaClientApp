import { baseUrl, gameApi, socket } from 'features/gameApi/gameApi';
import { ERROR_RESPONSE } from 'common/text-constants';

export const {
  useReconnectedLoginMutation,
  endpoints: reconnectedLoginEndpoint,
} = gameApi.injectEndpoints({
  endpoints: build => ({
    reconnectedLogin: build.mutation({
      queryFn: async (_, { getState }, _extraOptions) => {
        let response;
        try {
          const headers = new Headers({ 'Content-type': 'application/json' });
          const token = getState().auth.token;
          if (token) headers.set('authorization', `Bearer ${token}`);

          response = await fetch(baseUrl + '/user/reconnectedlogin', {
            method: 'POST',
            body: JSON.stringify({ socketId: socket.id }),
            headers,
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
