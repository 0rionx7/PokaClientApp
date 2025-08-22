import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  useGetPokaStateQuery,
  useNextRoundMutation,
  useSitOutMutation,
} from '@poka/api/pokaApi';
import { selectUserName } from '@account/slice/accountSlice';

const useSitOutTimer = ({ playerName, handInfo, sittingOut }) => {
  const { gameId } = useParams();
  const { data } = useGetPokaStateQuery(gameId);
  const hostPlayerName = useSelector(selectUserName);
  const [nextRound] = useNextRoundMutation();
  const [sitOut] = useSitOutMutation();

  const { kind } = handInfo;
  const currentPlayer = data?.nextPlayers?.at(0);
  const submitting = currentPlayer?.selecting?.submit;
  const jokerReplacing = currentPlayer?.jokerReplacing;
  const isHostPlayer = playerName === hostPlayerName;
  const isPlaying = playerName === currentPlayer?.playerName;
  const noTimer = !isHostPlayer || data?.reaction === 101;

  useEffect(() => {
    if (noTimer || !isPlaying || kind) return;

    const factor = submitting || jokerReplacing ? 2 : 1;
    const timeOut = factor * data?.reaction * 1000;
    const timer = setTimeout(
      () => sitOut({ gameId, timedout: 'timedout' }),
      timeOut
    );

    return () => clearTimeout(timer);
  }, [
    noTimer,
    kind,
    isPlaying,
    sitOut,
    data?.reaction,
    submitting,
    jokerReplacing,
    gameId,
  ]);

  useEffect(() => {
    if (noTimer || !kind || sittingOut) return;

    const timer = setTimeout(() => nextRound(gameId), data?.reaction * 1200);

    return () => clearTimeout(timer);
  }, [noTimer, kind, nextRound, sittingOut, data?.reaction, gameId]);
};

export default useSitOutTimer;
