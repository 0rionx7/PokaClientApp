import { Fragment } from 'react';
import { useParams } from 'react-router-dom';

import { useGetGameStateQuery } from 'features/gameState/gameStateApi';

const PlayHandCards = () => {
  const { gameId } = useParams();
  const { handCardsInPlay, skarto, cardsInHand } = useGetGameStateQuery(
    gameId,
    {
      selectFromResult: ({ data }) => ({
        handCardsInPlay: data.handCardsInPlay?.slice().sort(),
        cardsInHand: data.cardsInHand,
        skarto: data.skarto,
      }),
    }
  );

  let extraHandCards = [];
  for (let i = 0; i < handCardsInPlay.length; i++) {
    extraHandCards.push(
      <Fragment key={i}>
        {i === 0 ? '' : ' ή '}
        <span>{handCardsInPlay[i]}</span>
      </Fragment>
    );
  }

  return (
    <div>
      <span>{cardsInHand}</span> {'χαρτιά στο χέρι '}
      {skarto && <span> συν ΈΝΑ ΣΚΑΡΤΟ,</span>} {`"παίζουν" `}
      {extraHandCards}
    </div>
  );
};

export default PlayHandCards;
