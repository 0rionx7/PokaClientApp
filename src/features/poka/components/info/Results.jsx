import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { selectPlayerStates } from '@poka/api/pokaApi';
import PlayerResult from '@poka/components/info/PlayerResult';
import './Results.scss';

const Results = () => {
  const { gameId } = useParams();
  const playerStates = useSelector(selectPlayerStates(gameId));

  const orderedPlayerStates = playerStates.toSorted(
    (a, b) =>
      b.amountWon - a.amountWon ||
      b.handInfo.handValue - a.handInfo.handValue ||
      Number(b.sittingOut) - Number(a.sittingOut)
  );
  return (
    <div className="results-board">
      <div className="player-result">
        <span>Κατ.</span>
        <span style={{ overflow: 'hidden' }}>Παίκτης</span>
        <span>&quot;Φύλο&quot;</span>
        <span>Κέρδη/Απώλ.</span>
      </div>
      {orderedPlayerStates.map(playerState => (
        <PlayerResult playerState={playerState} key={playerState.playerName} />
      ))}
    </div>
  );
};

export default Results;
