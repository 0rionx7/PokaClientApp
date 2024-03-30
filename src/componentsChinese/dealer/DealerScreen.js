import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import {
  useGetGameStateChineseQuery,
  useGetRequestsChineseQuery,
  useStartGameChineseMutation,
} from 'features/gameStateChinese/gameStateApi';
import ListedPlayers from 'componentsChinese/dealer/ListedPlayers';
import Overlay from 'components/ui/Overlay';
import Button from 'components/ui/Button';
import './DealerScreen.scss';

const DealerScreen = () => {
  const { gameId } = useParams();
  const { data: gameData } = useGetGameStateChineseQuery(gameId);
  const { data } = useGetRequestsChineseQuery(gameData.tableName);
  const [start] = useStartGameChineseMutation();

  const requestedStates = useMemo(
    () =>
      data
        ?.filter(request =>
          gameData?.playersStateList.every(
            ps => ps.playerName !== request.username
          )
        )
        .map(request => ({
          playerName: request.username,
          isSubscribed: new Date(request.subExpiration) - Date.now() > 0,
        })),
    [data, gameData?.playersStateList]
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
