import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  socket,
  useGetGameStateQuery,
  useNextRoundMutation,
  useSitOutMutation,
} from 'features/gameApi/gameApi';
import { useExpelMutation } from 'features/gameApi/gameStateMutations/useExpelMutation';

const emptyList = [];

const useSitOutTimer = ({ playerName, handInfo, sittingOut }) => {
  const { gameId } = useParams();
  const hostPlayerName = useSelector(state => state.auth.username);
  const [sitOut] = useSitOutMutation();
  const [nextRound] = useNextRoundMutation();
  const [expel] = useExpelMutation();
  const { playersStateList, currentPlayerStateList, reaction, dealer } =
    useGetGameStateQuery(gameId, {
      selectFromResult: ({ data }) => ({
        playersStateList: data?.playersStateList || emptyList,
        currentPlayerStateList: data?.currentPlayerStateList || emptyList,
        reaction: data?.reaction,
        dealer: data?.dealer,
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
      const timeOut = reaction * (submitting ? 2 : 1);
      const { gameId } = useParams();
      timer = setTimeout(
        () => sitOut({ gameId, cancellable: true }),
        timeOut * 1000
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
  ]);

  useEffect(() => {
    if (!isHostPlayer) return;
    const dealerName = playersStateList?.at(-1)?.playerName;
    let timer;
    if (
      playerName === dealerName &&
      !dealer &&
      !kind &&
      !hasTurn?.sittingOut &&
      !(hasTurn?.playerName === hostPlayerName)
    ) {
      const timeOut = reaction * (submitting ? 2 : 1);
      timer = setTimeout(() => {
        expel({
          playerName: hasTurn?.playerName,
          socketId: hasTurn?.socketId,
        });
      }, timeOut * 1.2 * 1000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [
    playerName,
    hasTurn?.playerName,
    isHostPlayer,
    kind,
    hasTurn?.sittingOut,
    hasTurn?.socketId,
    expel,
    reaction,
    dealer,
    hostPlayerName,
    playersStateList,
    submitting,
  ]);
};

export default useSitOutTimer;
