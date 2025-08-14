import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  selectHostPlayerState,
  selectTableCards,
  useGetPokaStateQuery,
} from '@poka/api/pokaApi';
import {
  selectChosenTableCardIndexes,
  toggleChosenCard,
} from '@poka/slice/pokaStateSlice';
import Card from '@poka/components/card/Card';

const BoardCard = ({ index }) => {
  const { gameId } = useParams();
  const { data } = useGetPokaStateQuery(gameId);
  const hostState = useSelector(selectHostPlayerState(gameId));
  const tableCards = useSelector(selectTableCards(gameId));
  const chosenCardIndexes = useSelector(selectChosenTableCardIndexes);

  const dispatch = useDispatch();

  const card = tableCards[index];

  if (!card) return <Card />;

  const { nextPlayers, thorns } = data;
  const playerSubmitted = hostState.submittedHand.length;
  const [currentPlayerState] = nextPlayers;
  const isSubmittingRound = currentPlayerState?.selecting?.submit;
  const isChosen = index => chosenCardIndexes.some(i => i === index);

  const handleChooseCard = index => {
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
      onChoose={() => handleChooseCard(index)}
      isChosen={isChosen(index)}
    />
  );
};

export default BoardCard;
