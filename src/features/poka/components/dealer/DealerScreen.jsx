import { useParams } from 'react-router-dom';

import {
  useGetPokaStateQuery,
  useGetPokaRequestsQuery,
} from '@poka/api/pokaApi';
import GameBuilder from '@poka/components/gameBuilder/GameBuilder';
import ListedPlayers from '@poka/components/dealer/ListedPlayers';
import Overlay from '@ui/Overlay';
import './DealerScreen.scss';
import GameBuilderContextProvider from '@poka/components/gameBuilder/useGameBuilderContext';

const DealerScreen = () => {
  const { gameId } = useParams();
  const { data: gameData } = useGetPokaStateQuery(gameId);
  const { data } = useGetPokaRequestsQuery(gameData?.tableName);

  const requestedStates = data
    ?.filter(request =>
      gameData?.playerStates.every(ps => ps.playerName !== request.username)
    )
    .map(request => ({
      playerName: request.username,
      isSubscribed: new Date(request.subExpiration) - Date.now() > 0,
    }));

  return (
    <Overlay className="builder-overlay">
      <GameBuilderContextProvider>
        <GameBuilder />
      </GameBuilderContextProvider>
      <div className="players-info">
        <ListedPlayers
          title="Συμμετέχοντες"
          playerStates={gameData.playerStates}
        />
        {requestedStates?.length > 0 && (
          <ListedPlayers
            title="Αιτούντες συμμετοχής"
            playerStates={requestedStates}
          />
        )}
      </div>
    </Overlay>
  );
};

export default DealerScreen;
