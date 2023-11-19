import { gameApi } from 'src/features/gameApi/gameApi';

export const authApi = gameApi.injectEndpoints({
  endpoints: build => ({
    getUser: build.query({
      query: () => 'user',
      providesTags: ['User'],
    }),
    changePassword: build.mutation({
      query: userData => ({
        url: 'user/passwordChange',
        method: 'PUT',
        body: userData,
      }),
    }),
    usernameChange: build.mutation({
      query: username => ({
        url: 'user/usernameChange',
        method: 'PUT',
        body: username,
      }),
      invalidatesTags: ['User'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetUserQuery,
  useChangePasswordMutation,
  useUsernameChangeMutation,
} = authApi;
