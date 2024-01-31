import { memo } from 'react';
import { useParams } from 'react-router-dom';

import { useGetGameStateQuery } from 'features/gameState/gameStateApi';
import PlayHandCards from 'components/info/PlayHandCards';
import FaceDownCards from 'components/info/FaceDownCards';
import { tabloCount } from 'lib/text-constants';
import Denies from 'components/info/Denies';
import Swaps from 'components/info/Swaps';
import Hats from 'components/info/Hats';
import './GameInfo.scss';

const GameInfo = () => {
  const { gameId } = useParams();
  const {
    data: {
      gameName,
      tableName,
      startingCard,
      allDiscardedWins,
      bomba,
      mirrorWins,
      queens,
      winningOrder,
      tablo,
      crossObligation,
      targetObligation,
      gamesCount,
    },
  } = useGetGameStateQuery(gameId);

  const tableTitle = tableName.split('_')?.[0];

  if (!gameName)
    return (
      <div className="game-info">
        <h2>{tableTitle}</h2>
        <p>Δέν υπάρχει επιλεγμένο παιχνίδι.</p>
      </div>
    );

  return (
    <div className="game-info">
      <div className="info-container">
        <div className="table-name">{tableTitle}</div>
        <div className="games-count">{gamesCount}ο παιχ.</div>
        <div className="gameName">
          <span>
            {gameName} {bomba && 'ΜΠΟΜΠΑ '}
            {tablo === tabloCount.DIPLO && (
              <>
                <span>σε</span> ΔΙΠΛΟ ΤΑΜΠΛΟ
              </>
            )}
          </span>
        </div>
        <span>
          {winningOrder} <span> μικ.χαρτί </span> {startingCard}
        </span>
        <Hats />
        <PlayHandCards />
        <div>
          <Denies />
          <Swaps />
        </div>
        <FaceDownCards />
        {(mirrorWins || allDiscardedWins) && (
          <div>
            <span>{mirrorWins ? 'ΚΑΘΡΕΦΤΗΣ' : 'ΑΦΥΛΛΙΑ'}</span>
            {' ανώτατο φύλλο'}
          </div>
        )}
        {queens && (
          <div>
            μπαλαντέρ και οι <span>ΝΤΑΜΕΣ</span>
          </div>
        )}
        {(crossObligation || targetObligation) && (
          <div>
            <span>ΥΠΟΧΡΕΩΣΗ </span> το <span>ΚΕΝΤΡΟ</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(GameInfo);
