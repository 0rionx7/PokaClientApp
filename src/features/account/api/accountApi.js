import { createSelector } from '@reduxjs/toolkit';
import { baseUrl, gameApi, socket } from '@store/gameApi';

export const accountApi = gameApi.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query({
      query: () => `${baseUrl}/user`,
      providesTags: ['User'],
    }),
    getRequests: build.query({
      query: (tableName) => `user/requests/${tableName}`,
      async onCacheEntryAdded(
        _arg,
        { cacheEntryRemoved, cacheDataLoaded, updateCachedData },
      ) {
        try {
          await cacheDataLoaded;
          // dealers screen requests handlers=======================
          const requestAddedListener = (reqInfo) => {
            updateCachedData((draft) => {
              draft.push(reqInfo);
            });
          };
          const requestRemovedListener = ({ username }) => {
            updateCachedData((draft) =>
              draft.filter((reqInfo) => reqInfo.username !== username),
            );
          };
          socket.on('requestAdded', requestAddedListener);
          socket.on('requestCanceled', requestRemovedListener);
          await cacheEntryRemoved;
          socket.off('requestAdded', requestAddedListener);
          socket.off('requestCanceled', requestRemovedListener);
        } catch (error) {
          console.log(error);
        }
      },
      providesTags: ['Requests'],
    }),
    register: build.mutation({
      query: (userData) => ({
        url: 'user/register',
        method: 'PUT',
        body: { ...userData, socketId: socket.id },
      }),
    }),
    login: build.mutation({
      query: (userData) => ({
        url: 'user/login',
        method: 'POST',
        body: { ...userData, socketId: socket.id },
      }),
    }),
    reconnectedLogin: build.mutation({
      query: (info) => ({
        url: '/user/reconnectedlogin',
        method: 'POST',
        body: { info, socketId: socket.id },
      }),
    }),
    logOut: build.mutation({
      query: () => ({
        url: 'user/logout',
        method: 'POST',
        body: { socketId: socket.id },
      }),
    }),
    changePassword: build.mutation({
      query: (userData) => ({
        url: 'user/passwordChange',
        method: 'PATCH',
        body: userData,
      }),
    }),
    usernameChange: build.mutation({
      query: (username) => ({
        url: 'user/usernameChange',
        method: 'PATCH',
        body: username,
      }),
      invalidatesTags: ['User'],
    }),
    forgotPassword: build.mutation({
      query: (email) => ({
        url: 'user/forgot',
        method: 'PATCH',
        body: email,
      }),
    }),
    requestJoin: build.mutation({
      query: (requestInfo) => ({
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
      query: (cancelInfo) => ({
        url: 'user/cancelRequest',
        method: 'PATCH',
        body: cancelInfo,
      }),
      invalidatesTags: ['User'],
    }),
    rejectRequest: build.mutation({
      query: (rejectlInfo) => ({
        url: 'user/rejectRequest',
        method: 'PATCH',
        body: rejectlInfo,
      }),
      invalidatesTags: ['Requests'],
    }),
    pay: build.mutation({
      query: (paymentInfo) => ({
        url: '/payments',
        method: 'POST',
        body: paymentInfo,
      }),
      invalidatesTags: ['User'],
    }),
    logOutAll: build.mutation({
      query: () => ({
        url: '/user/logOutAll',
        method: 'PATCH',
        body: {},
      }),
    }),
  }),
});

export const selectUserName = createSelector(
  accountApi.endpoints.getUser.select(),
  (result) => result?.data?.username,
);

export const {
  useGetUserQuery,
  useGetRequestsQuery,
  useRegisterMutation,
  useLoginMutation,
  useReconnectedLoginMutation,
  useLogOutMutation,
  useChangePasswordMutation,
  useUsernameChangeMutation,
  useForgotPasswordMutation,
  useRequestJoinMutation,
  useCancelRequestMutation,
  useRejectRequestMutation,
  usePayMutation,
  useLogOutAllMutation,
} = accountApi;
