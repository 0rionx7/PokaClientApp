import { useGetPokaStateQuery } from '@poka/api/pokaApi';
import { ORDER_NAME } from '@utils/text-constants';

const FaceDownCards = () => {
  const { data } = useGetPokaStateQuery();
  const faceDownCards = data.faceDownIndexes.length;

  if (!faceDownCards) return null;

  const closed = data.faceDownIndexes
    .toSorted()
    .map((index) => ORDER_NAME[index])
    .join(', ');

  return (
    <div>
      <span>{closed}</span>
      {` κλειστ${faceDownCards === 1 ? 'ό' : 'ά'}`}
    </div>
  );
};

export default FaceDownCards;
