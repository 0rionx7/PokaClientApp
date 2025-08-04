import { memo, useEffect, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  useGetGameStateChineseQuery,
  useNextRoundChineseMutation,
  useSubmitCardsChineseMutation,
} from 'features/gameStateChinese/gameStateApi';
import {
  selectBoardCards,
  selectHandcards,
} from 'features/gameStateChinese/gameStateSlice';
import { selectPlayername } from 'features/account/accountSlice';
import { isSitting } from 'utils/utilities-functions';
import FantasyButtons from 'componentsChinese/FantasyButtons';
import HandCards from 'componentsChinese/HandCards';
import Button from 'components/ui/Button';
import classes from './Table.module.scss';

const Hand = () => {
  const { gameId } = useParams();
  const hand = useSelector(selectHandcards);
  const boardCards = useSelector(selectBoardCards);
  const username = useSelector(selectPlayername);
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
  const sittedCount = data.playerStates.filter(isSitting).length;
  const canNext =
    sittedCount > 1 &&
    currentPlayerList.length <= sittedCount &&
    currentPlayerList.includes(username) &&
    !hasNexted;
  const shift = data.playerStates.length === 2 ? '-50%' : '50%';
  const left = `calc(-.5 * (var(--card-width) + .3rem) * ${hand?.length} + ${shift})`;

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
