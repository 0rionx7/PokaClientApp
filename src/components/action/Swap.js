import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectedCard, selectedCardsIndexes } from 'utils/utilities-functions';
import { useSelectCardsMutation } from 'features/gameState/gameStateApi';
import useSnackBar from 'hooks/useSnackBar';
import Button from 'components/ui/Button';

const Swap = ({ selecting }) => {
  const { gameId } = useParams();
  const handCards = useSelector(state => state.gameState.handCards);
  const [selectCards, { isLoading, isSuccess, error: swapError }] =
    useSelectCardsMutation();
  const { snackElement, setSnackInfo } = useSnackBar();

  const selectedHandCardsIndexes = selectedCardsIndexes(handCards);
  const selectedHandCardsCount = handCards.filter(selectedCard).length;
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
        onClick={() =>
          selectCards({
            gameId,
            selectionInfo: selecting,
            selectedHandCardsIndexes,
          })
        }
        disabled={isLoading || isSuccess || error}
        className="orange"
      />
    </div>
  );
};

export default Swap;
