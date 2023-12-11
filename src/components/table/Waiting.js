import { useParams } from 'react-router-dom';

import { useGetGameStateQuery } from 'features/gameState/gameStateApi';
import Overlay from 'components/ui/Overlay';
import './Table.scss';

const Waiting = () => {
  const { gameId } = useParams();
  const { data } = useGetGameStateQuery(gameId);

  return (
    <Overlay>
      <div className="waiting-content">
        Αναμονή να μοιράσει ο {data?.dealer}
      </div>
    </Overlay>
  );
};

export default Waiting;
