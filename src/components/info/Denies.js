import { useParams } from 'react-router-dom';

import { useGetGameStateQuery } from 'features/gameApi/gameApi';
import { countFem } from 'common/text-constants';

const Denies = () => {
  const { gameId } = useParams();
  const { denies } = useGetGameStateQuery(gameId, {
    selectFromResult: ({ data }) => ({ denies: data.denies }),
  });
  if (!denies) return null;

  return (
    <>
      {'με '}
      <span>
        {countFem[denies]} ΑΡΝΗΣ
        {denies > 1 ? 'ΕΙΣ ' : 'Η '}
      </span>
    </>
  );
};

export default Denies;
