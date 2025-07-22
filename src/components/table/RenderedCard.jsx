import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useGetGameStateQuery } from 'features/gameState/gameStateApi';
import { selectTablecards } from 'features/gameState/gameStateSlice';
import { selectPlayername } from 'features/account/accountSlice';
import { playerEntry } from 'utils/utilities-functions';
import Card from 'components/card/Card';

const RenderedCard = ({ index }) => {
  const tableCards = useSelector(selectTablecards);
  const playerName = useSelector(selectPlayername);
  const { gameId } = useParams();
  const { data } = useGetGameStateQuery(gameId);
  const { currentPlayerList, thorns } = data;

  const playerSubmitted = useMemo(
    () =>
      data?.playerStates.find(playerEntry(playerName))?.submittedHand.length,
    [data?.playerStates, playerName]
  );
  const [currentPlayerState] = currentPlayerList;
  const isSubmitting = currentPlayerState?.selecting?.submit;
  const card = tableCards[index];

  if (!card) return <Card />;

  return (
    <Card
      card={card}
      canBeSelected={
        card.value &&
        !thorns?.includes(index) &&
        isSubmitting &&
        !playerSubmitted
      }
    />
  );
};

export default RenderedCard;
