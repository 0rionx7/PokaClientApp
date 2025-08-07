import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { cardSelected, selectedCardIndexes } from '@utils/utilities-functions';
import { useSelectCardsMutation } from '@poka/api/pokaApi';
import { selectHandcards } from '@poka/slice/pokaStateSlice';
import useSnackBar from '@hooks/useSnackBar';
import Button from '@ui/Button';

const Discard = ({ selecting }) => {
  const { gameId } = useParams();
  const handCards = useSelector(selectHandcards);
  const [selectCards, { isLoading, isSuccess }] = useSelectCardsMutation();
  const { snackElement, setSnackInfo } = useSnackBar();

  const selectedHandCardIndexes = selectedCardIndexes(handCards);
  const selectedHandCardCount = handCards.filter(cardSelected).length;
  const discardError = selectedHandCardCount > 1;

  const handleDiscard = async () => {
    const result = await selectCards({
      gameId,
      selectionInfo: selecting,
      selectedHandCardIndexes,
    });
    if (result.error?.data) setSnackInfo(result.error.data);
  };

  useEffect(() => {
    if (discardError) {
      setSnackInfo(`Έχετε επιλέξει ${selectedHandCardCount} χαρτιά αντί για 1`);
    }
  }, [selectedHandCardCount, discardError, setSnackInfo]);

  const noSelection = selectedHandCardCount === 0;
  const prompt = noSelection ? 'Επιλέξτε σκάρτο' : 'Απόρριψη';

  return (
    <div className="buttons-container">
      {snackElement}
      <Button
        prompt={prompt}
        onClick={handleDiscard}
        disabled={isLoading || isSuccess || discardError || noSelection}
        className="red"
      />
    </div>
  );
};
export default Discard;
