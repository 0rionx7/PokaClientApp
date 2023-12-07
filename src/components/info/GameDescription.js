import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useGetGameStateQuery } from 'features/gameState/gameStateApi';
import { createTableTitle } from 'common/text-functions';
import { gamesInfo } from 'common/text-constants';
import './Info.scss';

const descriptionTitles = ['ΔΙΑΤΑΞΗ:', 'ΟΜΑΔΕΣ:', 'ΑΝΟΙΓΜΑ:', 'ΕΠΙΛΟΓΕΣ:'];

const GameDescription = () => {
  const { gameId } = useParams();
  const { gameName, dealer, tableName } = useGetGameStateQuery(gameId, {
    selectFromResult: ({ data }) => ({
      gameName: data.gameName,
      tableName: data.tableName,
      dealer: data.dealer,
    }),
  });
  const hostPlayerName = useSelector(state => state.account.username);
  const currentChoosenGame = useSelector(
    state => state.gameState.currentChoosenGame
  );
  const game = hostPlayerName === dealer ? currentChoosenGame : gameName;
  const tableTitle = useMemo(() => createTableTitle(tableName), [tableName]);

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
        {gamesInfo[game]?.split('_').map((infoText, i) => (
          <div key={i}>
            <span>{descriptionTitles[i]}</span> {infoText}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameDescription;
