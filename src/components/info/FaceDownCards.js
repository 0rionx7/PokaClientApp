import { Fragment } from 'react';
import { useParams } from 'react-router-dom';

import { useGetGameStateQuery } from 'features/gameState/gameStateApi';
import { orderName } from 'utils/text-constants';

const FaceDownCards = () => {
  const { gameId } = useParams();
  const { data } = useGetGameStateQuery(gameId);

  if (data.faceDownIndexes.length === 7) return null;

  let closed = [];
  data.faceDownIndexes
    ?.slice()
    .sort()
    .forEach((index, i) => {
      const cardPosition = parseInt(index);
      if (cardPosition < data?.cardsInHand)
        closed.push(
          i === 0 ? orderName[cardPosition] : `, ${orderName[cardPosition]}`
        );
    });

  return (
    <div>
      {closed.map(cl => (
        <span key={cl}>{cl}</span>
      ))}{' '}
      κλειστό
    </div>
  );
};

export default FaceDownCards;
