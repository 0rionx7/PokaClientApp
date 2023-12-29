import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  useGetGameStateQuery,
  useNextRoundMutation,
  useSitOutMutation,
} from 'features/gameState/gameStateApi';
import { setHasNexted } from 'features/gameState/gameStateSlice';

const useSitOutTimer = ({ playerName, handInfo, sittingOut }) => {
  const { gameId } = useParams();
  const { data } = useGetGameStateQuery(gameId);
  const hostPlayerName = useSelector(state => state.account.username);
  const hasNexted = useSelector(state => state.gameState.hasNexted);
  const [nextRound] = useNextRoundMutation();
  const [sitOut] = useSitOutMutation();
  const dispatch = useDispatch();

  const { kind } = handInfo;
  const hasTurn = data?.currentPlayerList?.at(0);
  const submitting = hasTurn?.selecting?.submit;
  const isHostPlayer = playerName === hostPlayerName;
  const isPlaying = playerName === hasTurn?.playerName;

  useEffect(() => {
    if (!isHostPlayer || data?.reaction === 101) return;
    let timer;
    if (isPlaying && !kind) {
      const timeOut = (submitting ? 2 : 1) * data?.reaction * 1000;
      timer = setTimeout(
        () => sitOut({ gameId, timedout: 'timedout' }),
        timeOut
      );
    }

    return () => clearTimeout(timer);
  }, [
    kind,
    isHostPlayer,
    isPlaying,
    nextRound,
    sittingOut,
    sitOut,
    data?.reaction,
    submitting,
    gameId,
  ]);

  useEffect(() => {
    if (!isHostPlayer || data?.reaction === 101) return;
    let timer;
    if (kind && !sittingOut && !hasNexted)
      timer = setTimeout(() => nextRound(gameId), data?.reaction * 1200);

    return () => clearTimeout(timer);
  }, [
    kind,
    isHostPlayer,
    nextRound,
    sittingOut,
    data?.reaction,
    hasNexted,
    gameId,
  ]);

  useEffect(() => {
    if (!isHostPlayer || data?.reaction === 101) return;
    if (!kind) dispatch(setHasNexted(false));
  }, [kind, isHostPlayer, dispatch, data?.reaction]);
};

export default useSitOutTimer;
