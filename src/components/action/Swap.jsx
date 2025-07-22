import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { cardSelected, selectedCardIndexes } from 'utils/utilities-functions';
import { useSelectCardsMutation } from 'features/gameState/gameStateApi';
import useSnackBar from 'hooks/useSnackBar';
import Button from 'components/ui/Button';

const getCardLabel = count => `ΧΑΡΤΙ${count !== 1 ? 'Α' : ''}`;

const Swap = ({ selecting }) => {
  const { gameId } = useParams();
  const handCards = useSelector(state => state.gameState.handCards);
  const [selectCards, { isLoading, isSuccess, error }] =
    useSelectCardsMutation();
  const { snackElement, setSnackInfo } = useSnackBar();

  const selectedHandCardIndexes = selectedCardIndexes(handCards);
  const selectedHandCardsCount = handCards.filter(cardSelected).length;
  const swapError = selectedHandCardsCount > selecting.swaps;

  useEffect(() => {
    if (swapError)
      setSnackInfo(
        `Έχετε επιλέξει ${selectedHandCardsCount} χαρτιά αντί για ${selecting.swaps}`
      );
  }, [setSnackInfo, swapError, selectedHandCardsCount, selecting.swaps]);

  useEffect(() => {
    if (error) setSnackInfo(error.data);
  }, [error, setSnackInfo]);

  const prompt = swapError ? (
    'Λάθος επιλογή'
  ) : selectedHandCardsCount === 0 ? (
    'Χωρίς αλλαγή'
  ) : (
    <>
      ΑΛΛΑΓΗ <br />
      <span>{selectedHandCardsCount}</span> <br />
      {getCardLabel(selectedHandCardsCount)}
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
            selectedHandCardIndexes,
          })
        }
        disabled={isLoading || isSuccess || swapError}
        className="orange"
      />
    </div>
  );
};

export default Swap;
