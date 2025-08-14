import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useSelectCardsMutation } from '@poka/api/pokaApi';
import { selectChosenHandCardIndexes } from '@poka/slice/pokaStateSlice';
import useSnackBar from '@hooks/useSnackBar';
import Button from '@ui/Button';

const Discard = ({ selecting }) => {
  const { gameId } = useParams();
  const selectedHandCardIndexes = useSelector(selectChosenHandCardIndexes);
  const [selectCards, { isLoading, isSuccess }] = useSelectCardsMutation();
  const { snackElement, setSnackInfo } = useSnackBar();

  const handleDiscard = async () => {
    const result = await selectCards({
      gameId,
      selectionInfo: selecting,
      selectedHandCardIndexes,
    });
    if (result.error?.data) setSnackInfo(result.error.data);
  };

  const noSelection = !selectedHandCardIndexes.length;
  const discardError = selectedHandCardIndexes.length > 1;
  const prompt = noSelection ? 'Επιλέξτε σκάρτο' : 'Απόρριψη';

  useEffect(() => {
    if (discardError) {
      setSnackInfo(
        `Έχετε επιλέξει ${selectedHandCardIndexes.length} χαρτιά αντί για 1`
      );
    }
  }, [selectedHandCardIndexes.length, discardError, setSnackInfo]);

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
