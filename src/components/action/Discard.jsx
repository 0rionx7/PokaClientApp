import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectedCard, selectedCardsIndexes } from 'utils/utilities-functions';
import { useSelectCardsMutation } from 'features/gameState/gameStateApi';
import useSnackBar from 'hooks/useSnackBar';
import Button from 'components/ui/Button';

const Discard = ({ selecting }) => {
  const { gameId } = useParams();
  const handCards = useSelector(state => state.gameState.handCards);
  const [selectCards, { isLoading, isSuccess, error }] =
    useSelectCardsMutation();
  const { snackElement, setSnackInfo } = useSnackBar();

  const selectedHandCardsIndexes = selectedCardsIndexes(handCards);
  const selectedHandCardsCount = handCards.filter(selectedCard).length;
  const discardError = selectedHandCardsCount > 1;

  useEffect(() => {
    if (discardError) {
      setSnackInfo(
        `Έχετε επιλέξει ${selectedHandCardsCount} χαρτιά αντί για 1`
      );
    }
  }, [selectedHandCardsCount, discardError, setSnackInfo]);

  useEffect(() => {
    if (error) setSnackInfo(error.data);
  }, [error, setSnackInfo]);

  const noSelection = selectedHandCardsCount === 0;
  const prompt = noSelection ? 'Επιλέξτε σκάρτο' : 'Απόρριψη';

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
        disabled={isLoading || isSuccess || discardError || noSelection}
        className="red"
      />
    </div>
  );
};
export default Discard;
