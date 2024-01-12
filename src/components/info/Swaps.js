import { useParams } from 'react-router-dom';

import { useGetGameStateQuery } from 'features/gameState/gameStateApi';
import { countFem } from 'lib/text-constants';

const Swaps = () => {
  const { gameId } = useParams();
  const { data } = useGetGameStateQuery(gameId);

  if (!data.swaps) return null;

  return (
    <>
      {' και '}
      <span>
        {countFem[data.swaps]} ΑΛΛΑΓ
        {data.swaps > 1 ? 'ΕΣ' : 'Η'}
      </span>
    </>
  );
};

export default Swaps;
