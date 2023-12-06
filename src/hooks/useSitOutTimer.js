import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  useGetGameStateQuery,
  useNextRoundMutation,
  useSitOutMutation,
} from 'features/gameStateSlice/gameApi';

const emptyList = [];

const useSitOutTimer = ({ playerName, handInfo, sittingOut }) => {
  const { gameId } = useParams();
  const hostPlayerName = useSelector(state => state.auth.username);
  const [sitOut] = useSitOutMutation();
  const [nextRound] = useNextRoundMutation();
  const { currentPlayerStateList, reaction } = useGetGameStateQuery(gameId, {
    selectFromResult: ({ data }) => ({
      currentPlayerStateList: data?.currentPlayerStateList || emptyList,
      reaction: data?.reaction,
    }),
  });

  const { kind } = handInfo;
  const hasTurn = currentPlayerStateList?.at(0);
  const submitting = hasTurn?.selecting?.submit;
  const isHostPlayer = playerName === hostPlayerName;
  const isActive = playerName === hasTurn?.playerName;

  useEffect(() => {
    if (!isHostPlayer || reaction === 101) return;
    let timer;
    if (isActive && !kind) {
      const timeOut = (submitting ? 2 : 1) * reaction * 1000;
      timer = setTimeout(
        () => sitOut({ gameId, timedout: 'timedout' }),
        timeOut
      );
    } else if (kind && !sittingOut)
      timer = setTimeout(nextRound, reaction * 1000);

    return () => clearTimeout(timer);
  }, [
    kind,
    isHostPlayer,
    isActive,
    nextRound,
    sittingOut,
    sitOut,
    reaction,
    submitting,
    gameId,
  ]);
};

export default useSitOutTimer;
