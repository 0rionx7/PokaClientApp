import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useSubmitCardsMutation } from 'features/gameApi/gameStateMutations/useSubmitCardsMutation';
import { useEvaluateHandMutation } from 'features/gameApi/gameStateMutations/useEvaluateHandMutation';
import { selectedCard } from 'common/utilities-functions';
import { describeHand } from 'common/text-functions';
import Overlay from 'components/ui/Overlay';
import useSnackBar from 'hooks/useSnackBar';
import Button from 'components/ui/Button';

const Submit = () => {
  const { handCards, tableCards } = useSelector(state => state.gameState);
  const [
    submitHand,
    {
      isLoading: submitting,
      isSuccess: submissionSuccess,
      error: submitionError,
    },
  ] = useSubmitCardsMutation();
  const [
    evaluateHand,
    {
      data,
      reset,
      isLoading: eveluating,
      isSuccess: evaluationSuccess,
      error: evaluationError,
    },
  ] = useEvaluateHandMutation();
  const { snackElement, setSnackInfo } = useSnackBar();

  const selectedHandCardsCount = handCards
    .concat(tableCards)
    .filter(selectedCard).length;
  let error;
  if (selectedHandCardsCount > 5)
    error = `Έχετε επιλέξει ${selectedHandCardsCount} χαρτιά αντί για 5`;
  useEffect(() => setSnackInfo(error), [setSnackInfo, error]);

  useEffect(() => {
    if (evaluationError || submitionError)
      setSnackInfo(evaluationError?.data || submitionError?.data);
  }, [evaluationError, submitionError, setSnackInfo]);

  const prompt = error ? (
    <>Λάθος επιλογή</>
  ) : (
    <>ΑΞΙΟΛΟΓΗΣΗ ΕΠΙΛΕΓΜΕΝΩΝ ΧΑΡΤΙΩΝ</>
  );
  let description = describeHand(data?.evaluatedHand, true);

  return (
    <div className="buttons-container">
      {snackElement}
      {data?.evaluatedHand ? (
        <>
          <Overlay />
          <Button
            prompt={<h3>{description}</h3>}
            onClick={() => submitHand()}
            disabled={submitting || submissionSuccess}
            className="green"
            style={{ fontSize: '.7rem' }}
          />
          <Button
            prompt={<h3>ΑΚΥΡΩΣΗ</h3>}
            onClick={reset}
            disabled={submitting || submissionSuccess}
            className="red"
            style={{ fontSize: '.7rem' }}
          />
        </>
      ) : (
        <Button
          prompt={prompt}
          onClick={() => evaluateHand()}
          disabled={error || eveluating || evaluationSuccess}
          className="orange"
        />
      )}
    </div>
  );
};

export default Submit;
