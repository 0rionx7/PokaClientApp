import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useGetGameStateQuery } from 'src/features/gameApi/gameApi';
import GameBuilder from 'src/components/gameBuilder/GameBuilder';
import ListedPlayers from 'src/components/dealer/ListedPlayers';
import { playerEntry } from 'src/common/utilities-functions';
import Overlay from 'src/components/ui/Overlay';
import './DealerScreen.scss';

const DealerScreen = () => {
  const hostPlayerName = useSelector(state => state.auth.username);
  const { gameId } = useParams();
  const { playersStateList, joinRequests } = useGetGameStateQuery(gameId, {
    selectFromResult: ({ data }) => ({
      playersStateList: data.playersStateList,
      hostPlayerState: data.playersStateList.find(playerEntry(hostPlayerName)),
      joinRequests: data.joinRequests,
      dealer: data.dealer,
    }),
  });

  return (
    <Overlay className="builder-overlay">
      <GameBuilder />
      <div className="players-info">
        <ListedPlayers
          playersStateList={playersStateList}
          title="Συμμετέχοντες"
        />
        {joinRequests.length > 0 && (
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
