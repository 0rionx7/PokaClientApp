import { useParams } from 'react-router-dom';

import { useGetGameStateQuery } from 'features/gameState/gameStateApi';
import PlayerStanding from 'components/info/PlayerStanding';
import { inGameFistList } from 'common/utilities-functions';
import './Standings.scss';

const titles = ['Κατ.', 'Παίκτης', 'Ρέστα', 'Κέρδη/Απώλ.'];

const Standings = () => {
  const { gameId } = useParams();
  const { data } = useGetGameStateQuery(gameId);

  const playersStateList = data.playersStateList
    .slice()
    .sort((a, b) => b.resta - a.resta);
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
