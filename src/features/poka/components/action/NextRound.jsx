import { useParams } from 'react-router-dom';

import {
  useGetPokaStateQuery,
  useNextRoundMutation,
  useRevealCardsMutation,
} from '@poka/api/pokaApi';
import Button from '@ui/Button';
import Overlay from '@ui/Overlay';
import { useSelector } from 'react-redux';
import { selectUserName } from '@account/slice/accountSlice';
import { isSitting, playerEntry } from '@utils/utilities-functions';

const NextRound = () => {
  const { gameId } = useParams();
  const hostPlayerName = useSelector(selectUserName);
  const { data } = useGetPokaStateQuery(gameId);
  const [nextRound, { isLoading, isSuccess }] = useNextRoundMutation();
  const [reveal, { revealing, revealed }] = useRevealCardsMutation();
  const { handCards, submittedHand } = data.playerStates.find(
    playerEntry(hostPlayerName)
  );

  const showReveal =
    !submittedHand.length &&
    handCards.some(card => card.faceUp === false) &&
    data.playerStates.filter(isSitting).length > 1;

  return (
    <Overlay style={{ zIndex: 50, backgroundColor: 'rgb(0 0 0 / 4%)' }}>
      {showReveal && (
        <Button
          prompt={<h2>Αποκαλύψτε τα χαρτιά σας</h2>}
          onClick={() => reveal(gameId)}
          disabled={revealing || revealed}
          className="purple reveal"
        />
      )}
      <Button
        prompt={
          isSuccess ? <h2>αναμονή υπολοίπων...</h2> : <h2>Επόμενος γύρος</h2>
        }
        onClick={() => nextRound(gameId)}
        disabled={isLoading || isSuccess}
        className="orange next-round"
      />
    </Overlay>
  );
};

export default NextRound;
