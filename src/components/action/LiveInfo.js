import { useParams } from 'react-router-dom';

import { useGetGameStateQuery } from 'src/features/gameApi/gameApi';
import './LiveInfo.scss';

const LiveInfo = () => {
  const { gameId } = useParams();
  const { pot, currentPlayerStateList, playersStateList, gamesCount } =
    useGetGameStateQuery(gameId, {
      selectFromResult: ({ data }) => ({
        gamesCount: data.gamesCount,
        pot: data.playersStateList.reduce((acc, curr) => acc + curr.bet, 0),
        currentPlayerStateList: data.currentPlayerStateList,
        playersStateList: data.playersStateList,
      }),
    });
  const [currentPlayer] = currentPlayerStateList;

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
          pot,
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
