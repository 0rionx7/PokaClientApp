import { useGetPokaStateQuery } from '@poka/api/pokaApi';
import { COUNT_FEM } from '@utils/text-constants';

const Swaps = () => {
  const { data } = useGetPokaStateQuery();

  const { swaps, denials } = data;

  if (!swaps) return null;

  return (
    <>
      {denials ? ' και ' : 'με '}
      <span>{`${COUNT_FEM[swaps]}  ΑΛΛΑΓ${swaps > 1 ? 'ΕΣ' : 'Η'}`}</span>
    </>
  );
};

export default Swaps;
