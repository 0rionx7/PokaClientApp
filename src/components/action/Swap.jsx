import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectedCard, selectedCardsIndexes } from 'utils/utilities-functions';
import { useSelectCardsMutation } from 'features/gameState/gameStateApi';
import { selectHandcards } from 'features/gameState/gameStateSlice';
import useSnackBar from 'hooks/useSnackBar';
import Button from 'components/ui/Button';
import { useState } from 'react';

const Swap = ({ selecting }) => {
  const { gameId } = useParams();
  const handCards = useSelector(selectHandcards);
  const [selectCards, { isLoading, isSuccess, error, reset }] =
    useSelectCardsMutation();
  const { snackElement, setSnackInfo } = useSnackBar();
  const [selected, setSelected] = useState(0);

  const selectedHandCardsIndexes = selectedCardsIndexes(handCards);
  const selectedHandCardsCount = handCards.filter(selectedCard).length;

  if (error) {
    setSnackInfo(error.data);
    reset();
  }

  const wrongSelection = selectedHandCardsCount > selecting.swaps;
  if (selectedHandCardsCount !== selected) {
    setSelected(selectedHandCardsCount);
    if (wrongSelection)
      setSnackInfo(
        `Έχετε επιλέξει ${selectedHandCardsCount} χαρτιά αντί για ${selecting.swaps}`
      );
  }

  const prompt = (
    <>
      {wrongSelection ? (
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
        disabled={isLoading || isSuccess || wrongSelection}
        className="orange"
      />
    </div>
  );
};

export default Swap;
