import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import io from 'socket.io-client';

export const baseUrl = import.meta.env.VITE_FRONTEND_URL;
export const socket = io(baseUrl, { transports: ['websocket'] });

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    headers.set('Content-type', 'application/json');
    const token = getState().account.token;
    if (token) headers.set('authorization', `Bearer ${token}`);
    return headers;
  },
});

const injectingGameIdBaseQuery = async (args, api, extraOptions) => {
  const gameId = api.getState().account.gameId;

  if (typeof args === 'object') {
    args = {
      ...args,
      body: {
        ...(args.body || {}),
        gameId: args.body?.gameId || gameId,
        socketId: socket.id,
      },
    };
  }

  return baseQuery(args, api, extraOptions);
};

export const gameApi = createApi({
  reducerPath: 'gameApi',
  baseQuery: injectingGameIdBaseQuery,
  tagTypes: ['User', 'Requests', 'ChineseRequests'],
  endpoints: (build) => ({
    getTables: build.query({
      queryFn: async (game, { getState }) => {
        try {
          const token = getState().account.token;
          if (!token) return { data: [] };

          const httpHeaders = {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          };
          const headers = new Headers(httpHeaders);
          const params = new URLSearchParams({ game });
          const response = await fetch(
            `${baseUrl}/tables?${params.toString()}`,
            { method: 'GET', headers }
          );

          const responseData = await response.json();
          if (!response.ok) throw Error(responseData);

          return { data: responseData };
        } catch (error) {
          return { error };
        }
      },
      async onCacheEntryAdded(
        type,
        { cacheEntryRemoved, cacheDataLoaded, updateCachedData }
      ) {
        try {
          await cacheDataLoaded;
          const tableCreatedListener = (tableInfo) => {
            updateCachedData((draft) => {
              draft.push(tableInfo);
            });
          };
          const tableDeletedListerner = (deletedTable) => {
            updateCachedData((draft) =>
              draft.filter(({ tableName }) => tableName !== deletedTable)
            );
          };
          const table =
            type === 'poka'
              ? { created: 'pokaTableCreated', deleted: 'pokaTableDeleted' }
              : {
                  created: 'chineseTableCreated',
                  deleted: 'chineseTableDeleted',
                };
          socket.on(table.created, tableCreatedListener);
          socket.on(table.deleted, tableDeletedListerner);
          await cacheEntryRemoved;
          socket.off(table.created, tableCreatedListener);
          socket.off(table.deleted, tableDeletedListerner);
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useGetTablesQuery } = gameApi;
