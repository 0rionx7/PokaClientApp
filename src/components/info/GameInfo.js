import { memo } from 'react';
import { useParams } from 'react-router-dom';

import { useGetGameStateQuery } from 'features/gameApi/gameApi';
import PlayHandCards from 'components/info/PlayHandCards';
import FaceDownCards from 'components/info/FaceDownCards';
import { tabloCount } from 'common/text-constants';
import Denies from 'components/info/Denies';
import Swaps from 'components/info/Swaps';
import Hats from 'components/info/Hats';
import './GameInfo.scss';
import { createTableTitle } from 'common/text-functions';
import { useMemo } from 'react';

const GameInfo = () => {
  const { gameId } = useParams();
  const {
    gameName,
    tableName,
    startingCard,
    allDiscardedWins,
    bomba,
    mirrorWins,
    winningOrder,
    tablo,
  } = useGetGameStateQuery(gameId, {
    selectFromResult: ({ data }) => ({
      gameName: data.gameName,
      tableName: data.tableName,
      startingCard: data.startingCard,
      allDiscardedWins: data.allDiscardedWins,
      bomba: data.bomba,
      tablo: data.tablo,
      mirrorWins: data.mirrorWins,
      winningOrder: data.winningOrder,
    }),
  });

  const tableTitle = useMemo(() => createTableTitle(tableName), [tableName]);

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
        <div className="gameName">
          <span>
            {gameName}
            {bomba && ' ΜΠΟΜΠΑ '}
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
      </div>
    </div>
  );
};

export default memo(GameInfo);
