import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  selectHostPlayerState,
  selectPlayerStates,
  useGetPokaStateQuery,
  useNextRoundMutation,
  useRevealCardsMutation,
} from '@poka/api/pokaApi';
import Button from '@ui/Button';
import Overlay from '@ui/Overlay';
import { isSitting } from '@utils/helper-functions';
import { GAME_NAMES } from '@utils/text-constants';

const NextRound = () => {
  const { gameId } = useParams();
  const {
    data: { gameName },
  } = useGetPokaStateQuery(gameId);
  const playerStates = useSelector(selectPlayerStates(gameId));
  const [nextRound, { isLoading, isSuccess }] = useNextRoundMutation();
  const [reveal, { isSuccess: revealed }] = useRevealCardsMutation();
  const { submittedHand, handCards } = useSelector(
    selectHostPlayerState(gameId)
  );

  const isFiveCardsPoker =
    gameName === GAME_NAMES.POKER && handCards.length === 5;
  const showRevealBtn =
    !submittedHand.length &&
    playerStates.filter(isSitting).length > 1 &&
    !isFiveCardsPoker &&
    !revealed;

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
          onClick={() => reveal(gameId)}
          className="purple reveal"
        />
      )}
      <Button
        prompt={prompt}
        onClick={() => nextRound(gameId)}
        disabled={isLoading || isSuccess}
        className="orange next-round"
      />
    </Overlay>
  );
};

export default NextRound;
