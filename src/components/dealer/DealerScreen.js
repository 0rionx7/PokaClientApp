import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  useGetGameStateQuery,
  useGetRequestsQuery,
} from 'features/gameStateSlice/gameApi';
import GameBuilder from 'components/gameBuilder/GameBuilder';
import ListedPlayers from 'components/dealer/ListedPlayers';
import { playerEntry } from 'common/utilities-functions';
import Overlay from 'components/ui/Overlay';
import './DealerScreen.scss';

const DealerScreen = () => {
  const hostPlayerName = useSelector(state => state.auth.username);
  const { gameId } = useParams();
  const { playersStateList } = useGetGameStateQuery(gameId, {
    selectFromResult: ({ data }) => ({
      playersStateList: data.playersStateList,
      hostPlayerState: data.playersStateList.find(playerEntry(hostPlayerName)),
      dealer: data.dealer,
    }),
  });
  const { data: joinRequests } = useGetRequestsQuery(gameId);

  return (
    <Overlay className="builder-overlay">
      <GameBuilder />
      <div className="players-info">
        <ListedPlayers
          playersStateList={playersStateList}
          title="Συμμετέχοντες"
        />
        {joinRequests?.length > 0 && (
          <ListedPlayers
            playersStateList={joinRequests}
            title="Αιτούντες συμμετοχής"
          />
        )}
      </div>
    </Overlay>
  );
};

export default DealerScreen;
