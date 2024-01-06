import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useGetGameStateQuery } from 'features/gameState/gameStateApi';
import { playerEntry } from 'common/utilities-functions';
import Card from 'components/card/Card';

const RenderedCard = ({ index }) => {
  const tableCards = useSelector(state => state.gameState.tableCards);
  const playerName = useSelector(state => state.account.username);
  const { gameId } = useParams();
  const { data } = useGetGameStateQuery(gameId);
  const { currentPlayerList, thorns } = data;

  const playerSubmitted = useMemo(
    () =>
      data?.playersStateList.find(playerEntry(playerName))?.submittedHand
        .length,
    [data?.playersStateList, playerName]
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
