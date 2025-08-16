import { useParams } from 'react-router-dom';

import { useGetPokaStateQuery } from '@poka/api/pokaApi';
import { COUNT_FEM } from '@utils/text-constants';

const Swaps = () => {
  const { gameId } = useParams();
  const { data } = useGetPokaStateQuery(gameId);

  if (!data.swaps) return null;

  return (
    <>
      {data.denials ? ' και ' : 'με '}
      <span>
        {`${COUNT_FEM[data.swaps]}  ΑΛΛΑΓ${data.swaps > 1 ? 'ΕΣ' : 'Η'}`}
      </span>
    </>
  );
};

export default Swaps;
