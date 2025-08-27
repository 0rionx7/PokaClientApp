import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import {
  useGetUserQuery,
  useReconnectedLoginMutation,
} from '@account/api/accountApi';
import { selectToken } from '@account/slice/accountSlice';
import { socket } from '@store/gameApi';

export default function useLoginOnConnect(key) {
  const { refetch } = useGetUserQuery();
  const token = useSelector(selectToken);
  const [reconnectLogin] = useReconnectedLoginMutation();

  useEffect(() => {
    refetch();
  }, [token, refetch]);

  useEffect(() => {
    socket.on('connect', () => reconnectLogin(key));

    return () => {
      socket.removeAllListeners('connect');
    };
  }, [key, reconnectLogin]);
}
