import { useParams } from 'react-router-dom';

import { useGetGameStateQuery } from 'features/gameState/gameStateApi';
import { orderName } from 'utils/text-constants';

const FaceDownCards = () => {
  const { gameId } = useParams();
  const { data } = useGetGameStateQuery(gameId);
  const faceDownCards = data.faceDownIndexes.length;

  if (!faceDownCards) return null;

  let closed = data.faceDownIndexes
    .toSorted()
    .map(index => orderName[index])
    .join(', ');

  return (
    <div>
      <span>{closed}</span>
      {` κλειστ${faceDownCards === 1 ? 'ό' : 'ά'}`}
    </div>
  );
};

export default FaceDownCards;
