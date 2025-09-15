import {
  useGetChineseStateQuery,
  useStartChineseGameMutation,
} from '@chinese/api/chineseApi';
import Overlay from '@ui/Overlay';
import Button from '@ui/Button';
import { isSitting } from '@utils/helper-functions';
import PlayerRequests from '@components/requests/PlayerRequests';
import './DealerScreen.scss';

const DealerScreen = () => {
  const {
    data: { playerStates },
  } = useGetChineseStateQuery();
  const [deal] = useStartChineseGameMutation();

  const canDeal = playerStates.filter(isSitting).length > 1;
  const prompt = canDeal ? 'ΜΟΙΡΑΣΤΕ' : 'Δεν κάθετε άλλος παίκτης στο τραπέζι';

  return (
    <Overlay className="dealer-overlay">
      <div className="players-info">
        <PlayerRequests
          useGetStateQuery={useGetChineseStateQuery}
          maxPlayersCount={3}
        />
      </div>
      <Button
        prompt={prompt}
        disabled={!canDeal}
        onClick={deal}
        className="orange"
      />
    </Overlay>
  );
};

export default DealerScreen;
