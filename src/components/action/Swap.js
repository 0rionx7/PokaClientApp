import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useSelectCardsMutation } from 'src/features/gameApi/gameStateMutations/useSelectCardsMutation';
import useSnackBar from 'src/hooks/useSnackBar';
import Button from 'src/components/ui/Button';
import { selectedCard } from 'src/common/utilities-functions';

const Swap = ({ selecting }) => {
  const hostPlayerHandCards = useSelector(state => state.gameState.handCards);
  const [selectCards, { isLoading, isSuccess, error: swapError }] =
    useSelectCardsMutation();
  const { snackElement, setSnackInfo } = useSnackBar();

  const selectedHandCardsCount =
    hostPlayerHandCards.filter(selectedCard).length;
  let error;
  if (selectedHandCardsCount > selecting.swaps)
    error = `Έχετε επιλέξει ${selectedHandCardsCount} χαρτιά αντί για ${selecting.swaps}`;
  useEffect(() => setSnackInfo(error), [setSnackInfo, error]);

  useEffect(() => {
    if (swapError) setSnackInfo(swapError.data);
  }, [swapError, setSnackInfo]);

  const prompt = (
    <>
      {error ? (
        'Λάθος επιλογή'
      ) : selectedHandCardsCount === 0 ? (
        'Χωρίς αλλαγή'
      ) : (
        <>
          ΑΛΛΑΓΗ <br />
          <span> {selectedHandCardsCount}</span> <br />
          {'ΧΑΡΤΙ' + (selectedHandCardsCount !== 1 ? 'Α' : '')}
        </>
      )}
    </>
  );

  return (
    <div className="buttons-container">
      {snackElement}
      <Button
        prompt={prompt}
        onClick={() => selectCards(selecting)}
        disabled={isLoading || isSuccess || error}
        className="orange"
      />
    </div>
  );
};

export default Swap;
