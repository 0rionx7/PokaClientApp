import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useGetGameStateQuery } from 'src/features/gameApi/gameApi';
import { playerEntry } from 'src/common/utilities-functions';
import Card from 'src/components/card/Card';

const RenderedCard = ({ index }) => {
  const tableCards = useSelector(state => state.gameState.tableCards);
  const playerName = useSelector(state => state.auth.username);
  const { gameId } = useParams();
  const { currentPlayerStateList, playerSubmitted, thorns } =
    useGetGameStateQuery(gameId, {
      selectFromResult: ({ data }) => ({
        currentPlayerStateList: data?.currentPlayerStateList,
        thorns: data?.thorns,
        playerSubmitted: data?.playersStateList.find(playerEntry(playerName))
          ?.submittedHand.length,
      }),
    });
  const [currentPlayerState] = currentPlayerStateList;
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
