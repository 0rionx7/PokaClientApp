import { useParams } from 'react-router-dom';
import { count } from 'utils/text-constants';

import { useGetPokaStateQuery } from 'features/poka/pokaApi';

const Hats = () => {
  const { gameId } = useParams();
  const { data } = useGetPokaStateQuery(gameId);

  if (!data.hats) return null;

  return (
    <div>
      με <span>{count[data.hats]}</span> {'καπέλο '}
      {data.obligation ? <span> ΥΠΟΧΡΕΩΣΗ</span> : ''}
    </div>
  );
};

export default Hats;
