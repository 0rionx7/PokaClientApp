import { gameApi, socket } from 'features/gameApi/gameApi';

export const authApi = gameApi.injectEndpoints({
  endpoints: build => ({
    getUser: build.query({
      query: () => 'user',
      providesTags: ['User'],
    }),
    register: build.mutation({
      query: userData => ({
        url: 'user/login',
        method: 'POST',
        body: { ...userData, socketId: socket.id },
      }),
    }),
    login: build.mutation({
      query: userData => ({
        url: 'user/login',
        method: 'POST',
        body: { ...userData, socketId: socket.id },
      }),
    }),
    logout: build.mutation({
      query: _ => ({
        url: 'user/logout',
        method: 'POST',
        body: { socketId: socket.id },
      }),
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
  useLoginMutation,
  useLogOutMutation,
  useRegisterMutation,
  useChangePasswordMutation,
  useUsernameChangeMutation,
} = authApi;
