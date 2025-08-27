import { useParams } from 'react-router-dom';
import { COUNT } from '@utils/text-constants';

import { useGetPokaStateQuery } from '@poka/api/pokaApi';

const Hats = () => {
  const { gameId } = useParams();
  const { data } = useGetPokaStateQuery(gameId);

  const { hats, obligation } = data;

  if (!hats) return null;

  return (
    <div>
      με <span>{COUNT[hats]}</span> {'καπέλο '}
      {obligation ? <span> ΥΠΟΧΡΕΩΣΗ</span> : ''}
    </div>
  );
};

export default Hats;
