import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { cardSelected, selectedCardIndexes } from '@utils/utilities-functions';
import { selectHandcards } from '@poka/slice/pokaStateSlice';
import { useSelectCardsMutation } from '@poka/api/pokaApi';
import useSnackBar from '@hooks/useSnackBar';
import Button from '@ui/Button';

const getCardLabel = count => `ΧΑΡΤΙ${count !== 1 ? 'Α' : ''}`;

const Swap = ({ selecting }) => {
  const { gameId } = useParams();
  const handCards = useSelector(selectHandcards);
  const [selectCards, { isLoading, isSuccess }] = useSelectCardsMutation();
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

  const handleSelect = async () => {
    const result = await selectCards({
      gameId,
      selectionInfo: selecting,
      selectedHandCardIndexes,
    });
    if (result.error?.data) setSnackInfo(result.error.data);
  };

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
        onClick={handleSelect}
        disabled={isLoading || isSuccess || swapError}
        className="orange"
      />
    </div>
  );
};

export default Swap;
