import { useNextRoundMutation } from 'src/features/gameApi/gameStateMutations/useNextRoundMutation';
import Button from 'src/components/ui/Button';
import Overlay from 'src/components/ui/Overlay';
import './Renew.scss';

const NextRound = () => {
  const [nextRound, { isLoading, isSuccess }] = useNextRoundMutation();

  return (
    <Overlay style={{ zIndex: 50 }}>
      <Button
        prompt={
          isSuccess ? <h2>αναμονή υπολοίπων...</h2> : <h2>Επόμενος γύρος</h2>
        }
        onClick={() => nextRound()}
        disabled={isLoading || isSuccess}
        className="orange next-round"
      />
    </Overlay>
  );
};

export default NextRound;
