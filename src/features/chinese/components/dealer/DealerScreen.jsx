import { useParams } from 'react-router-dom';

import {
  useGetChineseStateQuery,
  useGetChineseRequestsQuery,
  useStartChineseGameMutation,
  useJoinChineseTableMutation,
  useRejectChineseRequestMutation,
} from '@chinese/api/chineseApi';
import Overlay from '@ui/Overlay';
import Button from '@ui/Button';
import { isSitting } from '@utils/utilities-functions';
import PlayerRequests from '@components/joinRequests/PlayerRequests';
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
          useGetRequestsQuery={useGetChineseRequestsQuery}
          useJoin={useJoinChineseTableMutation}
          useReject={useRejectChineseRequestMutation}
          maxPlayersCount={8}
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
