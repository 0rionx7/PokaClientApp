import { useParams } from 'react-router-dom';

import { useGetPokaStateQuery } from 'features/poka/pokaApi';
import Overlay from 'components/ui/Overlay';
import './Table.scss';

const Waiting = () => {
  const { gameId } = useParams();
  const { data } = useGetPokaStateQuery(gameId);

  return (
    <Overlay>
      <div className="waiting-content">
        Αναμονή να μοιράσει ο {data?.dealer}
      </div>
    </Overlay>
  );
};

export default Waiting;
