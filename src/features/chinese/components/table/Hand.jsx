import { memo, useEffect, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  useGetChineseStateQuery,
  useNextRoundChineseMutation,
  useSubmitCardsChineseMutation,
} from '@chinese/api/chineseApi';
import {
  selectBoardCards,
  selectHandcards,
} from '@chinese/slice/chineseStateSlice';
import { selectUserName } from '@account/slice/accountSlice';
import { isSitting } from '@utils/helper-functions';
import FantasyButtons from '@chinese/components/table/FantasyButtons';
import HandCards from '@chinese/components/table/HandCards';
import Button from '@ui/Button';
import classes from './Table.module.scss';

const Hand = () => {
  const { gameId } = useParams();
  const handCards = useSelector(selectHandcards);
  const boardCards = useSelector(selectBoardCards);
  const username = useSelector(selectUserName);
  const { data } = useGetChineseStateQuery(gameId);
  const [submit] = useSubmitCardsChineseMutation();
  const [nextRound] = useNextRoundChineseMutation();
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [hasNexted, setHasNexted] = useState(false);

  useEffect(() => {
    setHasNexted(false);
    setHasSubmitted(false);
  }, [handCards]);

  const { nextPlayers } = data;
  const [currentPlayer] = nextPlayers;

  const hasTurn = username === currentPlayer;
  const cardsLeftInHand = handCards?.filter(Boolean)?.length;
  const legitSubmit =
    handCards?.length === 5 ? cardsLeftInHand === 0 : cardsLeftInHand === 1;
  const canSubmit = !hasSubmitted && hasTurn && legitSubmit;
  const sittedCount = data.playerStates.filter(isSitting).length;
  const canNext =
    sittedCount > 1 &&
    nextPlayers.length <= sittedCount &&
    nextPlayers.includes(username) &&
    !hasNexted;
  const shift = data.playerStates.length === 2 ? '-50%' : '50%';
  const left = `calc(-.5 * (var(--card-width) + .3rem) * ${handCards?.length} + ${shift})`;

  const submitCards = useCallback(async () => {
    if (canSubmit) {
      setHasSubmitted(true);
      await submit({ boardCards: boardCards, gameId });
    }
    if (canNext) {
      setHasNexted(true);
      await nextRound(gameId);
    }
  }, [canSubmit, canNext, boardCards, nextRound, submit, gameId]);

  return (
    <div className={classes.hand} style={{ left }}>
      <Button
        onClick={submitCards}
        disabled={!canSubmit && !canNext}
        prompt={canNext ? 'Επόμενος γύρος' : 'Υποβολή'}
        style={{ padding: '.8rem 2rem' }}
      />
      <FantasyButtons />
      <HandCards />
    </div>
  );
};

export default memo(Hand);
