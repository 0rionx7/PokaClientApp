import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useSelectCardsMutation } from 'src/features/gameApi/gameStateMutations/useSelectCardsMutation';
import useSnackBar from 'src/hooks/useSnackBar';
import Button from 'src/components/ui/Button';
import { selectedCard } from 'src/common/utilities-functions';

const Discard = ({ selecting }) => {
  const hostPlayerHandCards = useSelector(state => state.gameState.handCards);
  const [selectCards, { isLoading, isSuccess, error: discardError }] =
    useSelectCardsMutation();
  const { snackElement, setSnackInfo } = useSnackBar();

  const selectedHandCardsCount =
    hostPlayerHandCards.filter(selectedCard).length;
  let error;
  if (selectedHandCardsCount > 1)
    error = `Έχετε επιλέξει ${selectedHandCardsCount} χαρτιά αντί για 1`;
  useEffect(() => setSnackInfo(error), [setSnackInfo, error]);

  useEffect(() => {
    if (discardError) setSnackInfo(discardError.data);
  }, [discardError, setSnackInfo]);

  const noSelection = selectedHandCardsCount === 0;
  const prompt = noSelection ? 'Επιλέξτε σκάρτο' : 'Απόρριψη';

  return (
    <div className="buttons-container">
      {snackElement}
      <Button
        prompt={prompt}
        onClick={() => selectCards(selecting)}
        disabled={isLoading || isSuccess || error || noSelection}
        className="red"
      />
    </div>
  );
};
export default Discard;
