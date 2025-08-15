import { useParams } from 'react-router-dom';

import { useGetPokaStateQuery } from '@poka/api/pokaApi';
import { COUNTFEM } from '@utils/text-constants';

const Denies = () => {
  const { gameId } = useParams();
  const { data } = useGetPokaStateQuery(gameId);

  if (!data.denials) return null;

  return (
    <>
      {'με '}
      <span>
        {`${COUNTFEM[data.denials]}  ΑΡΝΗΣ${data.denials > 1 ? 'ΕΙΣ ' : 'Η '}`}
      </span>
    </>
  );
};

export default Denies;
