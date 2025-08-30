import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { selectChosenHandCardIndexes } from '@poka/slice/pokaStateSlice';
import { useSelectCardsMutation } from '@poka/api/pokaApi';
import useSnackBar from '@hooks/useSnackBar';
import Button from '@ui/Button';

const getCardLabel = count => `ΧΑΡΤΙ${count !== 1 ? 'Α' : ''}`;

const Swap = ({ selecting }) => {
  const selectedHandCardIndexes = useSelector(selectChosenHandCardIndexes);
  const [selectCards, { isLoading, isSuccess }] = useSelectCardsMutation();
  const { snackElement, setSnackInfo } = useSnackBar();

  const selectedHandCardsCount = selectedHandCardIndexes.length;
  const swapError = selectedHandCardsCount > selecting.swaps;

  useEffect(() => {
    if (swapError)
      setSnackInfo(
        `Έχετε επιλέξει ${selectedHandCardsCount} χαρτιά αντί για ${selecting.swaps}`
      );
  }, [setSnackInfo, swapError, selectedHandCardsCount, selecting.swaps]);

  const handleSelect = async () => {
    const result = await selectCards({
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
