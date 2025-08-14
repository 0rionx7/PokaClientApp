import { useParams } from 'react-router-dom';

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
  const { gameId } = useParams();
  const { data: gameData } = useGetChineseStateQuery(gameId);
  const [start] = useStartChineseGameMutation();

  const canDeal = gameData.playerStates.filter(isSitting).length > 1;

  return (
    <Overlay className="dealer-overlay">
      <div className="players-info">
        <PlayerRequests
          useGetStateQuery={useGetChineseStateQuery}
          maxPlayersCount={3}
        />
      </div>
      <Button
        prompt="ΜΟΙΡΑΣΤΕ"
        disabled={!canDeal}
        onClick={() => start(gameId)}
        className="orange"
      />
    </Overlay>
  );
};

export default DealerScreen;
