import { useParams } from 'react-router-dom';

import { useGetGameStateQuery } from 'features/gameStateSlice/gameApi';
import Overlay from 'components/ui/Overlay';
import './Table.scss';

const Waiting = () => {
  const { gameId } = useParams();
  const { dealer } = useGetGameStateQuery(gameId, {
    selectFromResult: ({ data }) => ({ dealer: data.dealer }),
  });

  return (
    <Overlay>
      <div className="waiting-content">Αναμονή να μοιράσει ο {dealer}</div>
    </Overlay>
  );
};

export default Waiting;
