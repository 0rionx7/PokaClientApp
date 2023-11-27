import { useParams } from 'react-router-dom';

import { useGetGameStateQuery } from 'features/gameStateSlice/gameApi';
import { countFem } from 'common/text-constants';

const Swaps = () => {
  const { gameId } = useParams();
  const { swaps } = useGetGameStateQuery(gameId, {
    selectFromResult: ({ data }) => ({ swaps: data.swaps }),
  });
  if (!swaps) return null;

  return (
    <>
      {' και '}
      <span>
        {countFem[swaps]} ΑΛΛΑΓ
        {swaps > 1 ? 'ΕΣ' : 'Η'}
      </span>
    </>
  );
};

export default Swaps;
