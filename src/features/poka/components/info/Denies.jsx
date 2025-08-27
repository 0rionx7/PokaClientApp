import { useParams } from 'react-router-dom';

import { useGetPokaStateQuery } from '@poka/api/pokaApi';
import { COUNT_FEM } from '@utils/text-constants';

const Denies = () => {
  const { gameId } = useParams();
  const {
    data: { denials },
  } = useGetPokaStateQuery(gameId);

  if (!denials) return null;

  return (
    <>
      {'με '}
      <span>
        {`${COUNT_FEM[denials]}  ΑΡΝΗΣ${denials > 1 ? 'ΕΙΣ ' : 'Η '}`}
      </span>
    </>
  );
};

export default Denies;
