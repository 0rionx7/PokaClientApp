import { useParams } from 'react-router-dom';
import { count } from 'utils/text-constants';

import { useGetGameStateQuery } from 'features/gameState/gameStateApi';

const Hats = () => {
  const { gameId } = useParams();
  const { data } = useGetGameStateQuery(gameId);

  if (!data.hats) return null;

  return (
    <div>
      με <span>{count[data.hats]}</span> {'καπέλο '}
      {data.obligation ? <span> ΥΠΟΧΡΕΩΣΗ</span> : ''}
    </div>
  );
};

export default Hats;
