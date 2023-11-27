import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useSubmitCardsMutation } from 'features/gameApi/gameStateMutations/useSubmitCardsMutation';
import {
  useEvaluateHandMutation,
  useGetGameStateQuery,
} from 'features/gameApi/gameApi';
import { isMirror, selectedCardsIndexes } from 'common/utilities-functions';
import { describeHand } from 'common/text-functions';
import Overlay from 'components/ui/Overlay';
import useSnackBar from 'hooks/useSnackBar';
import Button from 'components/ui/Button';
import { gameNames } from 'common/text-constants';

const Submit = () => {
  const gameId = useSelector(state => state.gameState.gameId);
  const { gameName } = useGetGameStateQuery(gameId, {
    selectFromResult: ({ data }) => ({ gameName: data?.gameName }),
  });
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

  const submittedHandCardsIndexes = selectedCardsIndexes(handCards);
  const submittedTableCardsIndexes = selectedCardsIndexes(tableCards);

  const selectedHandCardsCount =
    submittedHandCardsIndexes.length + submittedTableCardsIndexes.length;

  useEffect(() => {
    if (evaluationError || submitionError)
      setSnackInfo(evaluationError?.data || submitionError?.data);
  }, [evaluationError, submitionError, setSnackInfo]);

  let description = describeHand(data?.evaluatedHand, true);

  const evaluateHandHandler = () => {
    if (selectedHandCardsCount > 5)
      return setSnackInfo(
        `Έχετε επιλέξει ${selectedHandCardsCount} χαρτιά αντί για 5`
      );
    if (
      submittedHandCardsIndexes.concat(submittedTableCardsIndexes).length !==
        5 &&
      gameName !== gameNames.GRAVEYARD &&
      !(gameName === gameNames.MAMUT && isMirror(tableCards, handCards))
    )
      return setSnackInfo(` Επιλέξτε συνολικά 5 χαρτιά`);
    evaluateHand({
      gameId,
      submittedHandCardsIndexes,
      submittedTableCardsIndexes,
    });
  };

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
          onClick={evaluateHandHandler}
          disabled={eveluating || evaluationSuccess}
          className="orange"
        />
      )}
    </div>
  );
};

export default Submit;
