import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { useGetGameStateQuery } from 'features/gameState/gameStateApi';
import './LiveInfo.scss';

const LiveInfo = () => {
  const { gameId } = useParams();
  const {
    data: { currentPlayerList, playersStateList, gamesCount },
  } = useGetGameStateQuery(gameId);
  const [currentPlayer] = currentPlayerList;

  const pot = useMemo(
    () => playersStateList.reduce((acc, curr) => acc + curr.bet, 0),
    [playersStateList]
  );

  return (
    <div className="live-info">
      <div className="info-row">
        {['Παιχνίδι', 'Ντίλερ', 'Παίζει', 'Πότ'].map(title => (
          <h6 key={title} style={{ textAlign: 'center' }}>
            {title}
          </h6>
        ))}
      </div>
      <div className="info-row">
        {[
          gamesCount + 'ο',
          playersStateList.at(-1).playerName,
          currentPlayer?.playerName,
          pot.toLocaleString(),
        ].map((value, i) => (
          <h5 key={i} style={{ textAlign: 'center' }}>
            {value}
          </h5>
        ))}
      </div>
    </div>
  );
};

export default LiveInfo;
