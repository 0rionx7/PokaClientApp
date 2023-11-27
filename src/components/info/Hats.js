import { useParams } from 'react-router-dom';
import { count } from 'common/text-constants';

import { useGetGameStateQuery } from 'features/gameStateSlice/gameApi';

const Hats = () => {
  const { gameId } = useParams();
  const { hats, obligation } = useGetGameStateQuery(gameId, {
    selectFromResult: ({ data }) => ({
      hats: data.hats,
      obligation: data.obligation,
    }),
  });
  if (!hats) return null;

  return (
    <div>
      με <span>{count[hats]}</span> {'καπέλο '}
      {obligation ? <span> ΥΠΟΧΡΕΩΣΗ</span> : ''}
    </div>
  );
};

export default Hats;
