import { Fragment } from 'react';
import { useParams } from 'react-router-dom';

import { useGetGameStateQuery } from 'features/poka/pokaApi';

const PlayHandCards = () => {
  const { gameId } = useParams();
  const { data } = useGetGameStateQuery(gameId);

  const handCardsInPlay = data.handCardsInPlay?.slice().sort();

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
      <span>{data.cardsInHand}</span> {'χαρτιά στο χέρι '}
      {data.skarto && <span> συν ΈΝΑ ΣΚΑΡΤΟ,</span>} {`"παίζουν" `}
      {extraHandCards}
    </div>
  );
};

export default PlayHandCards;
