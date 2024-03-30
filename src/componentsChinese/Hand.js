import { memo, useEffect, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  useGetGameStateChineseQuery,
  useNextRoundChineseMutation,
  useSubmitCardsChineseMutation,
} from 'features/gameStateChinese/gameStateApi';
import { isSeated } from 'utils/utilities-functions';
import FantasyButtons from 'componentsChinese/FantasyButtons';
import HandCards from 'componentsChinese/HandCards';
import Button from 'components/ui/Button';
import classes from './Table.module.scss';

const Hand = () => {
  const { gameId } = useParams();
  const hand = useSelector(state => state.chineseGameState.hand);
  const boardCards = useSelector(state => state.chineseGameState.boardCards);
  const username = useSelector(state => state.account.username);
  const { data } = useGetGameStateChineseQuery(gameId);
  const [submit] = useSubmitCardsChineseMutation();
  const [nextRound] = useNextRoundChineseMutation();
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
    <div className={classes.hand}>
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
