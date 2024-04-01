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

  useEffect(() => {
    setHasNexted(false);
    setHasSubmitted(false);
  }, [hand]);

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
  const shift = data.playersStateList.length === 2 ? '-50%' : '50%';
  const left = `calc(-.5 * (var(--card-width) + .3rem) * ${hand?.length} + ${shift})`;

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

  return (
    <div className={classes.hand} style={{ left }}>
      <Button
        onClick={submitCards}
        disabled={!canSubmit && !canNext}
        prompt={canNext ? 'next round' : 'Submit'}
        style={{ padding: '.8rem 2rem' }}
      />
      <FantasyButtons />
      <HandCards />
    </div>
  );
};

export default memo(Hand);
