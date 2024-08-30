import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useGetGameStateQuery } from 'features/gameState/gameStateApi';
import { selectPlayername } from 'features/account/accountSlice';
import { gamesInfo } from 'utils/text-constants';
import './Info.scss';

const GameDescription = () => {
  const { gameId } = useParams();
  const { data } = useGetGameStateQuery(gameId);
  const hostPlayerName = useSelector(selectPlayername);
  const currentChoosenGame = useSelector(
    state => state.gameState.currentChoosenGame
  );

  const game =
    hostPlayerName === data.dealer ? currentChoosenGame : data.gameName;
  const tableTitle = data.tableName.split('_')?.[0];

  if (!game)
    return (
      <div className="game-info">
        <h2>{tableTitle}</h2>
        <p>Δέν υπάρχει επιλεγμένο παιχνίδι.</p>
      </div>
    );

  return (
    <div className="game-info">
      <div className="info-container description">
        {gamesInfo[game]?.split('&').map((infoText, i) => {
          const [title, text] = infoText.split('_');
          return (
            <div key={i}>
              <span>{title}</span> {text}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GameDescription;
