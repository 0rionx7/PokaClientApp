import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useGetPokaStateQuery, useSitOutMutation } from '@poka/api/pokaApi';
import { selectUserName } from '@account/api/accountApi';
import { socket } from '@store/gameApi';
import { resetMessages } from '@account/slice/accountSlice';
import useSnackBar from '@hooks/useSnackBar';

export default function useTable() {
  const { gameId } = useParams();
  const { data, refetch } = useGetPokaStateQuery(gameId);
  const [sitOut] = useSitOutMutation();
  const dispatch = useDispatch();
  const { snackElement, setSnackInfo } = useSnackBar({ secs: 3, top: true });
  const hostPlayerName = useSelector(selectUserName);

  const { playerStates, dealer } = data;
  const isDealing = playerStates.at(-1).playerName === hostPlayerName;

  useEffect(() => {
    if (!dealer && !isDealing) setSnackInfo('GameInfo');
  }, [isDealing, setSnackInfo, dealer]);

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

  return snackElement;
}
