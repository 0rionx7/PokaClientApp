import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  selectHostPlayerState,
  selectPlayerStates,
  useNextRoundMutation,
  useRevealCardsMutation,
} from '@poka/api/pokaApi';
import Button from '@ui/Button';
import Overlay from '@ui/Overlay';
import { isSitting } from '@utils/helper-functions';

const NextRound = () => {
  const { gameId } = useParams();
  const playerStates = useSelector(selectPlayerStates(gameId));
  const [nextRound, { isLoading, isSuccess }] = useNextRoundMutation();
  const [reveal] = useRevealCardsMutation();
  const { submittedHand } = useSelector(selectHostPlayerState(gameId));
  const [revealed, setRevealed] = useState(false);

  const showReveal =
    !submittedHand.length &&
    playerStates.filter(isSitting).length > 1 &&
    !revealed;

  const prompt = isSuccess ? (
    <h2>αναμονή υπολοίπων...</h2>
  ) : (
    <h2>Επόμενος γύρος</h2>
  );

  return (
    <Overlay style={{ zIndex: 50, backgroundColor: 'rgb(0 0 0 / 4%)' }}>
      {showReveal && (
        <Button
          prompt={<h2>Αποκαλύψτε τα χαρτιά σας</h2>}
          onClick={() => {
            reveal(gameId);
            setRevealed(true);
          }}
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
