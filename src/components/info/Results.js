import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { useGetGameStateQuery } from 'features/gameState/gameStateApi';
import { inGameFistList } from 'common/utilities-functions';
import PlayerResult from 'components/info/PlayerResult';
import './Results.scss';

const Results = () => {
  const { gameId } = useParams();
  const { data } = useGetGameStateQuery(gameId);

  const playersStateList = useMemo(
    () =>
      data?.playersStateList
        .slice()
        .sort((a, b) =>
          b.amountWon - a.amountWon !== 0
            ? b.amountWon - a.amountWon
            : b.handInfo.handValue - a.handInfo.handValue
        ),
    [data?.playersStateList]
  );

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
