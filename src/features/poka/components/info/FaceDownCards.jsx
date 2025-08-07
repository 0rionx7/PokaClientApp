import { useParams } from 'react-router-dom';

import { useGetPokaStateQuery } from 'features/poka/pokaApi';
import { orderName } from 'utils/text-constants';

const FaceDownCards = () => {
  const { gameId } = useParams();
  const { data } = useGetPokaStateQuery(gameId);
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
