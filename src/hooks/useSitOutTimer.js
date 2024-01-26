import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  useGetGameStateQuery,
  useNextRoundMutation,
  useSitOutMutation,
} from 'features/gameState/gameStateApi';

const useSitOutTimer = ({ playerName, handInfo, sittingOut }) => {
  const { gameId } = useParams();
  const { data } = useGetGameStateQuery(gameId);
  const hostPlayerName = useSelector(state => state.account.username);
  const hasNexted = useSelector(state => state.gameState.hasNexted);
  const [nextRound] = useNextRoundMutation();
  const [sitOut] = useSitOutMutation();

  const { kind } = handInfo;
  const currentPlayer = data?.currentPlayerList?.at(0);
  const submitting = currentPlayer?.selecting?.submit;
  const jokering = currentPlayer?.jokering;
  const isHostPlayer = playerName === hostPlayerName;
  const isPlaying = playerName === currentPlayer?.playerName;

  useEffect(() => {
    if (!isHostPlayer || data?.reaction === 101) return;
    let timer;
    if (isPlaying && !kind) {
      const factor = submitting || jokering ? 2 : 1;
      const timeOut = factor * data?.reaction * 1000;
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
    sittingOut,
    sitOut,
    data?.reaction,
    submitting,
    jokering,
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
};

export default useSitOutTimer;
