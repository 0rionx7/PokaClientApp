import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { useGetPokaStateQuery } from 'features/poka/pokaApi';
import './LiveInfo.scss';

const LiveInfo = () => {
  const { gameId } = useParams();
  const {
    data: { currentPlayerList, playerStates, gamesCount },
  } = useGetPokaStateQuery(gameId);
  const [currentPlayer] = currentPlayerList;

  const pot = useMemo(
    () => playerStates.reduce((acc, curr) => acc + curr.bet, 0),
    [playerStates]
  );

  return (
    <div className="live-info">
      <div className="info-row">
        {['Παιχνίδι', 'Παίζει', 'Πότ'].map(title => (
          <h6 key={title} style={{ textAlign: 'center' }}>
            {title}
          </h6>
        ))}
      </div>
      <div className="info-row">
        {[
          gamesCount + 'ο',
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
