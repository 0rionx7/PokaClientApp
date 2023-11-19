import { baseUrl, gameApi, socket } from 'src/features/gameApi/gameApi';
import { ERROR_RESPONSE } from 'src/common/text-constants';

export const {
  useRedirectedLoginMutation,
  endpoints: redirectedLoginEndpoint,
} = gameApi.injectEndpoints({
  endpoints: build => ({
    redirectedLogin: build.mutation({
      queryFn: async (orderCode, { getState }, _extraOptions) => {
        let response;
        try {
          const headers = new Headers({ 'Content-type': 'application/json' });
          const token = getState().auth.token;
          if (token) headers.set('authorization', `Bearer ${token}`);

          response = await fetch(baseUrl + '/user/redirectedlogin', {
            method: 'POST',
            body: JSON.stringify({ orderCode, socketId: socket.id }),
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
