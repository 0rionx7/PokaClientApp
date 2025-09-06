import { useGetPokaStateQuery } from '@poka/api/pokaApi';
import Overlay from '@ui/Overlay';
import './Table.scss';

const Waiting = () => {
  const { data } = useGetPokaStateQuery();

  return (
    <Overlay>
      <div className="waiting-content">
        Αναμονή να μοιράσει ο {data?.dealer}
      </div>
    </Overlay>
  );
};

export default Waiting;
