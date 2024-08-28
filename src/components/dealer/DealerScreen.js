import { useParams } from 'react-router-dom';

import {
  useGetGameStateQuery,
  useGetRequestsQuery,
} from 'features/gameState/gameStateApi';
import GameBuilder from 'components/gameBuilder/GameBuilder';
import ListedPlayers from 'components/dealer/ListedPlayers';
import Overlay from 'components/ui/Overlay';
import './DealerScreen.scss';

const DealerScreen = () => {
  const { gameId } = useParams();
  const { data: gameData } = useGetGameStateQuery(gameId);
  const { data } = useGetRequestsQuery(gameData?.tableName);

  const requestedStates = data
    ?.filter(request =>
      gameData?.playersStateList.every(ps => ps.playerName !== request.username)
    )
    .map(request => ({
      playerName: request.username,
      isSubscribed: new Date(request.subExpiration) - Date.now() > 0,
    }));

  return (
    <Overlay className="builder-overlay">
      <GameBuilder />
      <div className="players-info">
        <ListedPlayers
          title="Συμμετέχοντες"
          playersStateList={gameData.playersStateList}
        />
        {requestedStates?.length > 0 && (
          <ListedPlayers
            title="Αιτούντες συμμετοχής"
            playersStateList={requestedStates}
          />
        )}
      </div>
    </Overlay>
  );
};

export default DealerScreen;
