import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  useEvaluateHandMutation,
  useGetGameStateQuery,
  useSubmitCardsMutation,
} from 'features/gameState/gameStateApi';
import { isMirror, selectedCardIndexes } from 'utils/utilities-functions';
import { describeHand } from 'utils/text-functions';
import useSnackBar from 'hooks/useSnackBar';
import Overlay from 'components/ui/Overlay';
import Button from 'components/ui/Button';
import { gameNames } from 'utils/games';

const Submit = () => {
  const { gameId } = useParams();
  const { handCards, tableCards } = useSelector(state => state.gameState);
  const { data: gameData } = useGetGameStateQuery(gameId);
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
  const { snackElement, setSnackInfo } = useSnackBar({ top: true });

  const submittedHandCardIndexes = selectedCardIndexes(handCards);
  const submittedTableCardIndexes = selectedCardIndexes(tableCards);

  const selectedHandCardsCount =
    submittedHandCardIndexes.length + submittedTableCardIndexes.length;

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
      submittedHandCardIndexes.concat(submittedTableCardIndexes).length !== 5 &&
      gameData.gameName !== gameNames.GRAVEYARD &&
      !(
        gameData.gameName === gameNames.MAMUT && isMirror(tableCards, handCards)
      )
    )
      return setSnackInfo(` Επιλέξτε συνολικά 5 χαρτιά`);
    evaluateHand({
      gameId,
      submittedHandCardIndexes,
      submittedTableCardIndexes,
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
            onClick={() =>
              submitHand({
                gameId,
                submittedHandCardIndexes: submittedHandCardIndexes,
                submittedTableCardIndexes: submittedTableCardIndexes,
              })
            }
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
          onClick={evaluateHandHandler}
          disabled={eveluating || evaluationSuccess}
          className="orange"
        />
      )}
    </div>
  );
};

export default Submit;
