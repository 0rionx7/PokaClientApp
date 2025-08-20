import { useParams } from 'react-router-dom';

import { useGetPokaStateQuery } from '@poka/api/pokaApi';
import { ORDER_NAME } from '@utils/text-constants';

const FaceDownCards = () => {
  const { gameId } = useParams();
  const { data } = useGetPokaStateQuery(gameId);
  const faceDownCards = data.faceDownIndexes.length;

  if (!faceDownCards) return null;

  const closed = data.faceDownIndexes
    .toSorted()
    .map(index => ORDER_NAME[index])
    .join(', ');

  return (
    <div>
      <span>{closed}</span>
      {` κλειστ${faceDownCards === 1 ? 'ό' : 'ά'}`}
    </div>
  );
};

export default FaceDownCards;
