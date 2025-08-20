import { useParams } from 'react-router-dom';

import { useGetPokaStateQuery } from '@poka/api/pokaApi';
import './LiveInfo.scss';
import { formatNumber } from '@utils/helper-functions';

const GameInfo = () => {
  const { gameId } = useParams();
  const {
    data: { nextPlayers, playerStates, gamesCount },
  } = useGetPokaStateQuery(gameId);
  const [currentPlayer] = nextPlayers;

  const pot = playerStates.reduce((acc, curr) => acc + curr.bet, 0);

  return (
    <div className="live-info">
      <div className="info-row">
        <h6>Παιχνίδι</h6>
        <h6>Παίζει</h6>
        <h6>Πότ</h6>
      </div>
      <div className="info-row">
        <h5>{`${gamesCount}o`}</h5>
        <h5>{currentPlayer?.playerName}</h5>
        <h5>{formatNumber(pot)}</h5>
      </div>
    </div>
  );
};

export default GameInfo;
