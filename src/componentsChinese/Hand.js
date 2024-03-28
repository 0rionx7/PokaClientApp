import { memo, useEffect, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import HandCards from 'componentsChinese/HandCards';
import Button from 'componentsChinese/ui/Button';
import {
  useGetGameStateQuery,
  useNextRoundMutation,
  useSubmitCardsMutation,
} from 'features/gameState/gameStateApi';
import FantasyButtons from 'componentsChinese/FantasyButtons';
import { isSeated } from 'utils/utilities-functions';

const Hand = () => {
  const { gameId } = useParams();
  const hand = useSelector(state => state.gameState.hand);
  const boardCards = useSelector(state => state.gameState.boardCards);
  const username = useSelector(state => state.account.username);
  const { data } = useGetGameStateQuery(gameId);
  const [submit] = useSubmitCardsMutation();
  const [nextRound] = useNextRoundMutation();
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [hasNexted, setHasNexted] = useState(false);

  const { currentPlayerList } = data;
  const [currentPlayer] = currentPlayerList;

  const hasTurn = username === currentPlayer;
  const cardsLeftInHand = hand?.filter(Boolean)?.length;
  const legitSubmit =
    hand?.length === 5 ? cardsLeftInHand === 0 : cardsLeftInHand === 1;
  const canSubmit = !hasSubmitted && hasTurn && legitSubmit;
  const canNext =
    currentPlayerList.length <= data.playersStateList.filter(isSeated).length &&
    currentPlayerList.includes(username) &&
    !hasNexted;

  const submitCards = useCallback(async () => {
    if (canSubmit) {
      await submit({ boardCards: boardCards, gameId });
      setHasSubmitted(true);
    }
    if (canNext) {
      await nextRound(gameId);
      setHasNexted(true);
    }
  }, [canSubmit, canNext, boardCards, nextRound, submit, gameId]);

  useEffect(() => {
    setHasNexted(false);
    setHasSubmitted(false);
  }, [hand]);

  useEffect(() => {
    // window.addEventListener('keyup', submitCards);
    // return () => {
    //   window.removeEventListener('keyup', submitCards);
    // };
  }, [submitCards]);

  return (
    <div className="hand">
      <Button
        onClick={submitCards}
        disabled={!canSubmit && !canNext}
        prompt={canNext ? 'next round' : 'Submit'}
      />
      <FantasyButtons />
      <HandCards />
    </div>
  );
};

export default memo(Hand);
