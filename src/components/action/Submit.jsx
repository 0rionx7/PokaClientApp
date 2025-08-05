import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  useEvaluateHandMutation,
  useGetGameStateQuery,
  useSubmitCardsMutation,
} from 'features/poka/pokaApi';
import { isMirror, selectedCardIndexes } from 'utils/utilities-functions';
import { describeHand } from 'utils/text-functions';
import useSnackBar from 'hooks/useSnackBar';
import Overlay from 'components/ui/Overlay';
import Button from 'components/ui/Button';
import { gameNames } from 'utils/games';
import {
  selectHandcards,
  selectTablecards,
} from 'features/poka/pokaStateSlice';

const Submit = () => {
  const { gameId } = useParams();
  const handCards = useSelector(selectHandcards);
  const tableCards = useSelector(selectTablecards);
  const { data: gameData } = useGetGameStateQuery(gameId);
  const [submitHand, { isLoading: submitting, isSuccess: submissionSuccess }] =
    useSubmitCardsMutation();
  const [
    evaluateHand,
    { data, reset, isLoading: eveluating, isSuccess: evaluationSuccess },
  ] = useEvaluateHandMutation();
  const { snackElement, setSnackInfo } = useSnackBar({ top: true });

  const submittedHandCardIndexes = selectedCardIndexes(handCards);
  const submittedTableCardIndexes = selectedCardIndexes(tableCards);

  const selectedHandCardsCount =
    submittedHandCardIndexes.length + submittedTableCardIndexes.length;

  let description = describeHand(data?.evaluatedHand, true);

  const handleEvaluate = async () => {
    if (selectedHandCardsCount > 5)
      return setSnackInfo(
        `Έχετε επιλέξει ${selectedHandCardsCount} χαρτιά αντί για 5`
      );
    if (
      submittedHandCardIndexes.concat(submittedTableCardIndexes).length !== 5 &&
      gameData.gameName !== gameNames.GRAVEYARD &&
      !(
        gameData.gameName === gameNames.MAMUT && isMirror(tableCards, handCards)
      )
    )
      return setSnackInfo(` Επιλέξτε συνολικά 5 χαρτιά`);

    const result = await evaluateHand({
      gameId,
      submittedHandCardIndexes,
      submittedTableCardIndexes,
    });
    if (result.error?.data) setSnackInfo(result.error.data);
  };

  const handleSubmit = async () => {
    const result = await submitHand({
      gameId,
      submittedHandCardIndexes: submittedHandCardIndexes,
      submittedTableCardIndexes: submittedTableCardIndexes,
    });
    if (result.error?.data) setSnackInfo(result.error.data);
  };

  return (
    <div className="buttons-container">
      {snackElement}
      {data?.evaluatedHand ? (
        <>
          <Overlay />
          <Button
            prompt={<h3>{description}</h3>}
            onClick={handleSubmit}
            disabled={submitting || submissionSuccess}
            className="green"
          />
          <Button
            prompt={<h3>ΑΚΥΡΩΣΗ</h3>}
            onClick={reset}
            disabled={submitting || submissionSuccess}
            className="red"
          />
        </>
      ) : (
        <Button
          prompt={'ΑΞΙΟΛΟΓΗΣΗ ΕΠΙΛΕΓΜΕΝΩΝ ΧΑΡΤΙΩΝ'}
          onClick={handleEvaluate}
          disabled={eveluating || evaluationSuccess}
          className="orange"
        />
      )}
    </div>
  );
};

export default Submit;
