import { gameStateApi, socket } from 'features/gameState/gameStateApi';

const socketId = socket.id;

export const accountApi = gameStateApi.injectEndpoints({
  endpoints: build => ({
    getUser: build.query({
      query: () => 'user',
      providesTags: ['User'],
    }),
    register: build.mutation({
      query: userData => ({
        url: 'user/register',
        method: 'PUT',
        body: { ...userData, socketId },
      }),
    }),
    login: build.mutation({
      query: userData => ({
        url: 'user/login',
        method: 'POST',
        body: { ...userData, socketId },
      }),
    }),
    reconnectedLogin: build.mutation({
      query: _ => ({
        url: '/user/reconnectedlogin',
        method: 'POST',
        body: { socketId },
      }),
    }),
    redirectedLogin: build.mutation({
      query: orderCode => ({
        url: '/user/redirectedlogin',
        method: 'POST',
        body: { orderCode, socketId },
      }),
    }),
    logOut: build.mutation({
      query: _ => ({
        url: 'user/logout',
        method: 'POST',
        body: { socketId },
      }),
    }),
    changePassword: build.mutation({
      query: userData => ({
        url: 'user/passwordChange',
        method: 'PATCH',
        body: userData,
      }),
    }),
    usernameChange: build.mutation({
      query: username => ({
        url: 'user/usernameChange',
        method: 'PATCH',
        body: username,
      }),
      invalidatesTags: ['User'],
    }),
    forgotPassword: build.mutation({
      query: email => ({
        url: 'user/forgot',
        method: 'PATCH',
        body: email,
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useRegisterMutation,
  useLoginMutation,
  useReconnectedLoginMutation,
  useRedirectedLoginMutation,
  useLogOutMutation,
  useChangePasswordMutation,
  useUsernameChangeMutation,
  useForgotPasswordMutation,
} = accountApi;
