import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useGetPokaStateQuery } from '@poka/api/pokaApi';
import { selectTablecards } from '@poka/slice/pokaStateSlice';
import { selectUserName } from '@account/slice/accountSlice';
import { playerEntry } from '@utils/utilities-functions';
import Card from '@poka/components/card/Card';

const BoardCard = ({ index }) => {
  const tableCards = useSelector(selectTablecards);
  const playerName = useSelector(selectUserName);
  const { gameId } = useParams();
  const { data } = useGetPokaStateQuery(gameId);
  const { nextPlayers, thorns } = data;

  const playerSubmitted = useMemo(
    () =>
      data?.playerStates.find(playerEntry(playerName))?.submittedHand.length,
    [data?.playerStates, playerName]
  );
  const [currentPlayerState] = nextPlayers;
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

export default BoardCard;
