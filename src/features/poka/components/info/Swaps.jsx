import { useParams } from 'react-router-dom';

import { useGetPokaStateQuery } from 'features/poka/pokaApi';
import { countFem } from 'utils/text-constants';

const Swaps = () => {
  const { gameId } = useParams();
  const { data } = useGetPokaStateQuery(gameId);

  if (!data.swaps) return null;

  return (
    <>
      {data.denies ? ' και ' : 'με '}
      <span>
        {`${countFem[data.swaps]}  ΑΛΛΑΓ${data.swaps > 1 ? 'ΕΣ' : 'Η'}`}
      </span>
    </>
  );
};

export default Swaps;
