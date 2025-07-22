import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { cardSelected, selectedCardIndexes } from 'utils/utilities-functions';
import { useSelectCardsMutation } from 'features/gameState/gameStateApi';
import useSnackBar from 'hooks/useSnackBar';
import Button from 'components/ui/Button';

const Discard = ({ selecting }) => {
  const { gameId } = useParams();
  const handCards = useSelector(state => state.gameState.handCards);
  const [selectCards, { isLoading, isSuccess, error }] =
    useSelectCardsMutation();
  const { snackElement, setSnackInfo } = useSnackBar();

  const selectedHandCardIndexes = selectedCardIndexes(handCards);
  const selectedHandCardCount = handCards.filter(cardSelected).length;
  const discardError = selectedHandCardCount > 1;

  useEffect(() => {
    if (discardError) {
      setSnackInfo(`Έχετε επιλέξει ${selectedHandCardCount} χαρτιά αντί για 1`);
    }
  }, [selectedHandCardCount, discardError, setSnackInfo]);

  useEffect(() => {
    if (error) setSnackInfo(error.data);
  }, [error, setSnackInfo]);

  const noSelection = selectedHandCardCount === 0;
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
            selectedHandCardIndexes,
          })
        }
        disabled={isLoading || isSuccess || discardError || noSelection}
        className="red"
      />
    </div>
  );
};
export default Discard;
