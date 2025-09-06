import { useDispatch, useSelector } from 'react-redux';

import { selectHostPlayerState, useGetPokaStateQuery } from '@poka/api/pokaApi';
import {
  selectChosenTableCardIndexes,
  toggleChosenCard,
} from '@poka/slice/pokaStateSlice';
import Card from '@poka/components/card/Card';

const BoardCard = ({ index }) => {
  const { data } = useGetPokaStateQuery();
  const hostState = useSelector(selectHostPlayerState);
  const chosenCardIndexes = useSelector(selectChosenTableCardIndexes);
  const dispatch = useDispatch();

  const { nextPlayers, thorns, tableCards } = data;
  const card = tableCards[index];

  if (!card) return <Card />;

  const playerSubmitted = hostState.submittedHand.length;
  const [currentPlayerState] = nextPlayers;
  const isSubmittingRound = currentPlayerState?.selecting?.submit;
  const isChosen = (index) => chosenCardIndexes.some((i) => i === index);

  const handleChooseCard = (index) => {
    const canBeChosen =
      card.value &&
      !thorns?.includes(index) &&
      isSubmittingRound &&
      !playerSubmitted;
    if (canBeChosen) dispatch(toggleChosenCard({ place: 'board', index }));
  };

  return (
    <Card
      card={card}
      onSelect={() => handleChooseCard(index)}
      isChosen={isChosen(index)}
    />
  );
};

export default BoardCard;
