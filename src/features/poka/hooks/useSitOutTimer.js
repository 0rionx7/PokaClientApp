import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import {
  useGetPokaStateQuery,
  useNextRoundMutation,
  useSitOutMutation,
} from '@poka/api/pokaApi';
import { selectUserName } from '@account/api/accountApi';

const useSitOutTimer = ({ playerName, handInfo, sittingOut }) => {
  const { data } = useGetPokaStateQuery();
  const hostPlayerName = useSelector(selectUserName);
  const [nextRound] = useNextRoundMutation();
  const [sitOut] = useSitOutMutation();

  const { kind } = handInfo;
  const { nextPlayers, reaction } = data;
  const currentPlayer = nextPlayers?.at(0);
  const submitting = currentPlayer?.selecting?.submit;
  const jokerReplacing = currentPlayer?.jokerReplacing;
  const isHostPlayer = playerName === hostPlayerName;
  const isPlaying = playerName === currentPlayer?.playerName;
  const noTimer = !isHostPlayer || reaction === 101;

  useEffect(() => {
    if (noTimer || !isPlaying || kind) return;

    const factor = submitting || jokerReplacing ? 2 : 1;
    const timeOut = factor * reaction * 1000;
    const timer = setTimeout(() => sitOut({ timedout: 'timedout' }), timeOut);

    return () => clearTimeout(timer);
  }, [noTimer, kind, isPlaying, sitOut, reaction, submitting, jokerReplacing]);

  useEffect(() => {
    if (noTimer || !kind || sittingOut) return;

    const timer = setTimeout(() => nextRound(), reaction * 1200);

    return () => clearTimeout(timer);
  }, [noTimer, kind, nextRound, sittingOut, reaction]);
};

export default useSitOutTimer;
