import { baseUrl, gameApi, socket } from '@store/gameApi';

export const accountApi = gameApi.injectEndpoints({
  endpoints: build => ({
    getUser: build.query({
      queryFn: async (_args, { getState }) => {
        try {
          const token = getState().account.token;
          if (!token) return { data: null };

          const httpHeaders = {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          };
          const headers = new Headers(httpHeaders);
          const response = await fetch(baseUrl + '/user', {
            method: 'GET',
            headers,
          });

          const responseData = await response.json();
          if (!response.ok) throw Error(responseData);

          return { data: responseData };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ['User'],
    }),
    register: build.mutation({
      query: userData => ({
        url: 'user/register',
        method: 'PUT',
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
    reconnectedLogin: build.mutation({
      query: _ => ({
        url: '/user/reconnectedlogin',
        method: 'POST',
        body: { socketId: socket.id },
      }),
    }),
    redirectedLogin: build.mutation({
      query: info => ({
        url: '/user/redirectedlogin',
        method: 'POST',
        body: { info, socketId: socket.id },
      }),
    }),
    logOut: build.mutation({
      query: _ => ({
        url: 'user/logout',
        method: 'POST',
        body: { socketId: socket.id },
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
    requestJoin: build.mutation({
      query: requestInfo => ({
        url: 'user/requestJoin',
        method: 'PATCH',
        body: {
          ...requestInfo,
          socketId: socket.id,
        },
      }),
      invalidatesTags: ['User'],
    }),
    cancelRequest: build.mutation({
      query: cancelInfo => ({
        url: 'user/cancelRequest',
        method: 'PATCH',
        body: cancelInfo,
      }),
      invalidatesTags: ['User'],
    }),
    requestJoinChinese: build.mutation({
      query: requestInfo => ({
        url: 'user/chinese/requestJoin',
        method: 'PATCH',
        body: {
          ...requestInfo,
          socketId: socket.id,
        },
      }),
      invalidatesTags: ['User'],
    }),
    cancelRequestChinese: build.mutation({
      query: cancelInfo => ({
        url: 'user/chinese/cancelRequest',
        method: 'PATCH',
        body: cancelInfo,
      }),
      invalidatesTags: ['User'],
    }),
    pay: build.mutation({
      query: paymentInfo => ({
        url: '/payments',
        method: 'POST',
        body: paymentInfo,
      }),
      invalidatesTags: ['User'],
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
  useRequestJoinMutation,
  useCancelRequestMutation,
  useRequestJoinChineseMutation,
  useCancelRequestChineseMutation,
  usePayMutation,
} = accountApi;
