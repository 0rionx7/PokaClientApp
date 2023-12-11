import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { useGetGameStateQuery } from 'features/gameState/gameStateApi';
import { useGetRequestsQuery } from 'features/account/requestsApi';
import GameBuilder from 'components/gameBuilder/GameBuilder';
import ListedPlayers from 'components/dealer/ListedPlayers';
import Overlay from 'components/ui/Overlay';
import './DealerScreen.scss';

const DealerScreen = () => {
  const { gameId } = useParams();
  const { data: gameData } = useGetGameStateQuery(gameId);
  const { data } = useGetRequestsQuery(gameData.tableName);

  const requestedStates = useMemo(
    () =>
      data?.map(request => ({
        playerName: request.username,
        isSubscribed: new Date(request.subExpiration) - Date.now() > 0,
      })),
    [data]
  );

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
