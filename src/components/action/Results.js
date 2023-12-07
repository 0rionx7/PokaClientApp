import { useParams } from 'react-router-dom';

import { useGetGameStateQuery } from 'features/gameState/gameStateApi';
import { inGameFistList } from 'common/utilities-functions';
import PlayerResult from 'components/action/PlayerResult';
import './Results.scss';

const emptyList = [];

const Results = () => {
  const { gameId } = useParams();
  const { playersStateList } = useGetGameStateQuery(gameId, {
    selectFromResult: ({ data }) => ({
      playersStateList:
        data.playersStateList
          .slice()
          .sort((a, b) =>
            b.amountWon - a.amountWon !== 0
              ? b.amountWon - a.amountWon
              : b.handInfo.handValue - a.handInfo.handValue
          ) || emptyList,
    }),
  });
  const renderList = inGameFistList(playersStateList);

  return (
    <div className="results-board">
      <div className="player-result">
        <span>Κατ.</span>
        <span style={{ overflow: 'hidden' }}>Παίκτης</span>
        <span>&quot;Φύλο&quot;</span>
        <span>Κέρδη/Απώλ.</span>
      </div>
      {renderList.map(playerState => (
        <PlayerResult playerState={playerState} key={playerState.playerName} />
      ))}
    </div>
  );
};

export default Results;
