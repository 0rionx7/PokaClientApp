import { selectPlayerStates } from '@poka/api/pokaApi';
import PlayerStanding from '@poka/components/info/PlayerStanding';
import './Standings.scss';
import { useSelector } from 'react-redux';

const titles = ['Κατ.', 'Παίκτης', 'Ρέστα', 'Κέρδη/Απώλ.'];

const Standings = () => {
  const playerStates = useSelector(selectPlayerStates);

  const orderedPlayerStates = playerStates.toSorted(
    (a, b) => b.resta - a.resta || Number(b.sittingOut) - Number(a.sittingOut)
  );

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
        {orderedPlayerStates.map(playerState => (
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
