import { useParams } from 'react-router-dom';

import { useNextRoundMutation } from 'features/gameStateSlice/gameApi';
import Button from 'components/ui/Button';
import Overlay from 'components/ui/Overlay';
import './Renew.scss';

const NextRound = () => {
  const { gameId } = useParams();
  const [nextRound, { isLoading, isSuccess }] = useNextRoundMutation();

  return (
    <Overlay style={{ zIndex: 50 }}>
      <Button
        prompt={
          isSuccess ? <h2>αναμονή υπολοίπων...</h2> : <h2>Επόμενος γύρος</h2>
        }
        onClick={() => nextRound(gameId)}
        disabled={isLoading || isSuccess}
        className="orange next-round"
      />
    </Overlay>
  );
};

export default NextRound;
