import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  selectHostPlayerState,
  useEvaluateHandMutation,
  useGetPokaStateQuery,
  useSubmitCardsMutation,
} from '@poka/api/pokaApi';
import { isMirror } from '@utils/helper-functions';
import { describeHand } from '@utils/text-functions';
import useSnackBar from '@hooks/useSnackBar';
import Overlay from '@ui/Overlay';
import Button from '@ui/Button';
import { gameNames } from '@poka/utils/games';
import {
  selectChosenHandCardIndexes,
  selectChosenTableCardIndexes,
} from '@poka/slice/pokaStateSlice';

const Submit = () => {
  const { gameId } = useParams();
  const submittedHandCardIndexes = useSelector(selectChosenHandCardIndexes);
  const submittedTableCardIndexes = useSelector(selectChosenTableCardIndexes);
  const {
    data: { gameName, tableCards },
  } = useGetPokaStateQuery(gameId);
  const { handCards } = useSelector(state =>
    selectHostPlayerState(state, gameId)
  );
  const [submitHand, { isLoading: submitting, isSuccess: submissionSuccess }] =
    useSubmitCardsMutation();
  const [
    evaluateHand,
    { data, reset, isLoading: eveluating, isSuccess: evaluationSuccess },
  ] = useEvaluateHandMutation();
  const { snackElement, setSnackInfo } = useSnackBar({ top: true });

  const selectedHandCardsCount =
    submittedHandCardIndexes.length + submittedTableCardIndexes.length;

  const handleEvaluate = async () => {
    if (selectedHandCardsCount > 5)
      return setSnackInfo(
        `Έχετε επιλέξει ${selectedHandCardsCount} χαρτιά αντί για 5`
      );
    if (
      submittedHandCardIndexes.concat(submittedTableCardIndexes).length !== 5 &&
      gameName !== gameNames.GRAVEYARD &&
      !(gameName === gameNames.MAMUT && isMirror(handCards, tableCards))
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

  const btnPrompt = (
    <h3>
      ΥΠΟΒΟΛΗ <br />
      {describeHand(data?.evaluatedHand)}
    </h3>
  );

  return (
    <div className="buttons-container">
      {snackElement}
      {data?.evaluatedHand ? (
        <>
          <Overlay />
          <Button
            prompt={btnPrompt}
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
