import { useParams } from 'react-router-dom';

import { useGetPokaStateQuery } from 'features/poka/pokaApi';
import PlayerStanding from 'components/info/PlayerStanding';
import { sortPlayers } from 'utils/utilities-functions';
import './Standings.scss';

const titles = ['Κατ.', 'Παίκτης', 'Ρέστα', 'Κέρδη/Απώλ.'];

const Standings = () => {
  const { gameId } = useParams();
  const { data } = useGetPokaStateQuery(gameId);

  const playerStates = data.playerStates
    .slice()
    .sort((a, b) => b.resta - a.resta);
  const renderList = sortPlayers(playerStates);

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
