import { useParams } from 'react-router-dom';

import { useGetGameStateQuery } from 'features/gameState/gameStateApi';
import { countFem } from 'lib/text-constants';

const Denies = () => {
  const { gameId } = useParams();
  const { data } = useGetGameStateQuery(gameId);

  if (!data?.denies) return null;

  return (
    <>
      {'με '}
      <span>
        {countFem[data?.denies]} ΑΡΝΗΣ
        {data?.denies > 1 ? 'ΕΙΣ ' : 'Η '}
      </span>
    </>
  );
};

export default Denies;
