import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import {
  useGetChineseStateQuery,
  useGetChineseRequestsQuery,
  useStartChineseGameMutation,
} from 'features/chinese/chineseApi';
import ListedPlayers from 'componentsChinese/dealer/ListedPlayers';
import Overlay from 'components/ui/Overlay';
import Button from 'components/ui/Button';
import './DealerScreen.scss';
import { isSitting } from 'utils/utilities-functions';

const DealerScreen = () => {
  const { gameId } = useParams();
  const { data: gameData } = useGetChineseStateQuery(gameId);
  const { data } = useGetChineseRequestsQuery(gameData?.tableName);
  const [start] = useStartChineseGameMutation();

  const requestedStates = useMemo(
    () =>
      data
        ?.filter(request =>
          gameData?.playerStates.every(ps => ps.playerName !== request.username)
        )
        .map(request => ({
          playerName: request.username,
          isSubscribed: new Date(request.subExpiration) - Date.now() > 0,
        })),
    [data, gameData?.playerStates]
  );
  const canDeal = gameData.playerStates.filter(isSitting).length > 1;

  return (
    <Overlay className="dealer-overlay">
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
