import { useParams } from 'react-router-dom';

import { useGetGameStateQuery } from 'features/gameApi/gameApi';
import PlayerStanding from 'components/info/PlayerStanding';
import { inGameFistList } from 'common/utilities-functions';
import './Standings.scss';

const emptyList = [];
const titles = ['Κατ.', 'Παίκτης', 'Ρέστα', 'Κέρδη/Απώλ.'];

const Standings = () => {
  const { gameId } = useParams();
  const { playersStateList } = useGetGameStateQuery(gameId, {
    selectFromResult: ({ data }) => ({
      playersStateList:
        data.playersStateList.slice().sort((a, b) => b.resta - a.resta) ||
        emptyList,
    }),
  });

  const renderList = inGameFistList(playersStateList);

  return (
    <div className="standings">
      <div className="standings-container">
        <div className="player-result">
          {titles.map(title => (
            <div key={title} style={{ textAlign: 'center' }}>
              {title}
            </div>
          ))}
        </div>
        {renderList.map(playerState => (
          <PlayerStanding
            playerState={playerState}
            key={playerState.playerName}
          />
        ))}
      </div>
    </div>
  );
};

export default Standings;
