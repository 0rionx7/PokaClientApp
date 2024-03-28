import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import {
  useGetGameStateQuery,
  useStartGameMutation,
} from 'features/chineseGameState/gameStateApi';
import { useGetRequestsQuery } from 'features/account/requestsApi';
import ListedPlayers from 'componentsChinese/dealer/ListedPlayers';
import Overlay from 'componentsChinese/ui/Overlay';
import Button from 'componentsChinese/ui/Button';
import './DealerScreen.scss';

const DealerScreen = () => {
  const { gameId } = useParams();
  const { data: gameData } = useGetGameStateQuery(gameId);
  const { data } = useGetRequestsQuery(gameData.tableName);
  const [start] = useStartGameMutation();

  const requestedStates = useMemo(
    () =>
      data?.map(request => ({
        playerName: request.username,
        isSubscribed: new Date(request.subExpiration) - Date.now() > 0,
      })),
    [data]
  );

  return (
    <Overlay className="dealer-overlay">
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
      <Button
        prompt="ΜΟΙΡΑΣΤΕ"
        disabled={false}
        onClick={() => start(gameId)}
      />
    </Overlay>
  );
};

export default DealerScreen;
