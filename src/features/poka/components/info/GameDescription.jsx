import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectCurrentChoosenGame } from 'poka/slice/pokaStateSlice';
import { useGetPokaStateQuery } from 'poka/api/pokaApi';
import { selectUserName } from 'account/slice/accountSlice';
import { gameInfo } from 'utils/text-constants';
import './Info.scss';

const GameDescription = () => {
  const { gameId } = useParams();
  const { data } = useGetPokaStateQuery(gameId);
  const hostPlayerName = useSelector(selectUserName);
  const currentChoosenGame = useSelector(selectCurrentChoosenGame);

  const gameName =
    hostPlayerName === data.dealer ? currentChoosenGame : data.gameName;
  const tableTitle = data.tableName.split('_')?.[0];

  if (!gameName)
    return (
      <div className="game-info">
        <h2>{tableTitle}</h2>
        <p>Δέν υπάρχει επιλεγμένο παιχνίδι.</p>
      </div>
    );

  return (
    <div className="game-info">
      <div className="info-container description">
        {gameInfo[gameName]?.split('&').map((infoText, i) => {
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
