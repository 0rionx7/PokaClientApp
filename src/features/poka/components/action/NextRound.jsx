import { useSelector } from 'react-redux';

import {
  selectHostPlayerState,
  useGetPokaStateQuery,
  useNextRoundMutation,
  useRevealCardsMutation,
} from '@poka/api/pokaApi';
import Button from '@ui/Button';
import Overlay from '@ui/Overlay';
import { GAME_NAMES } from '@utils/text-constants';

const NextRound = () => {
  const {
    data: { gameName },
  } = useGetPokaStateQuery();
  const [nextRound, { isLoading, isSuccess }] = useNextRoundMutation();
  const [reveal, { isSuccess: revealed }] = useRevealCardsMutation();
  const { submittedHand, handCards } = useSelector(selectHostPlayerState);

  const isFiveCardsPoker =
    gameName === GAME_NAMES.POKER && handCards.length === 5;
  const hasNoSubmittedCards =
    !submittedHand.length && handCards.filter(Boolean).length !== 0;
  const showRevealBtn = hasNoSubmittedCards && !isFiveCardsPoker && !revealed;

  const prompt = isSuccess ? (
    <h2>αναμονή υπολοίπων...</h2>
  ) : (
    <h2>Επόμενος γύρος</h2>
  );

  return (
    <Overlay style={{ zIndex: 50, backgroundColor: 'rgb(0 0 0 / 4%)' }}>
      {showRevealBtn && (
        <Button
          prompt={<h2>Αποκαλύψτε τα χαρτιά σας</h2>}
          onClick={() => reveal()}
          className="purple reveal"
        />
      )}
      <Button
        prompt={prompt}
        onClick={() => nextRound()}
        disabled={isLoading || isSuccess}
        className="orange next-round"
      />
    </Overlay>
  );
};

export default NextRound;
