import { useParams } from 'react-router-dom';

import { useGetRequestsQuery } from 'features/gameStateSlice/requestsApi';
import { useGetGameStateQuery } from 'features/gameStateSlice/gameApi';
import GameBuilder from 'components/gameBuilder/GameBuilder';
import ListedPlayers from 'components/dealer/ListedPlayers';
import Overlay from 'components/ui/Overlay';
import './DealerScreen.scss';

const DealerScreen = () => {
  const { gameId } = useParams();
  const { playersStateList, tableName } = useGetGameStateQuery(gameId, {
    selectFromResult: ({ data }) => ({
      playersStateList: data.playersStateList,
      tableName: data.tableName,
    }),
  });
  const { requestedStates } = useGetRequestsQuery(tableName, {
    selectFromResult: ({ data }) => ({
      requestedStates: data?.map(request => ({
        playerName: request.username,
        isSubscribed: new Date(request.subExpiration) - Date.now() > 0,
      })),
    }),
  });

  return (
    <Overlay className="builder-overlay">
      <GameBuilder />
      <div className="players-info">
        <ListedPlayers
          title="Συμμετέχοντες"
          playersStateList={playersStateList}
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
