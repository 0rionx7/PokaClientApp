import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { resetMessages } from '@account/slice/accountSlice';
import { useGetPokaStateQuery, useSitOutMutation } from '@poka/api/pokaApi';
import { socket } from '@store/gameApi';

export default function useTable() {
  const { gameId } = useParams();
  const { refetch } = useGetPokaStateQuery(gameId);
  const [sitOut] = useSitOutMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetMessages());
      sitOut({ gameId });
    };
  }, [gameId, sitOut, dispatch]);

  useEffect(() => {
    socket.on('connect', () => refetch());
    return () => socket.removeAllListeners('connect');
  }, [refetch]);
}
