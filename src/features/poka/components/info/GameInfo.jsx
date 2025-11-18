import { useGetPokaStateQuery } from '@poka/api/pokaApi'
import PlayHandCards from '@poka/components/info/PlayHandCards'
import FaceDownCards from '@poka/components/info/FaceDownCards'
import { getTableTitle } from '@utils/text-functions'
import { TABLOS } from '@utils/text-constants'
import Denies from '@poka/components/info/Denies'
import Swaps from '@poka/components/info/Swaps'
import Hats from '@poka/components/info/Hats'
import './GameInfo.scss'

const GameInfo = () => {
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
      gamesCount
    }
  } = useGetPokaStateQuery()

  const tableTitle = getTableTitle(tableName)

  if (!gameName)
    return (
      <div className="game-info">
        <h2>{tableTitle}</h2>
        <p>Δέν υπάρχει επιλεγμένο παιχνίδι.</p>
      </div>
    )

  return (
    <div className="game-info">
      <div className="info-container">
        <div className="table-name">{tableTitle}</div>
        <div className="games-count">{gamesCount}ο παιχ.</div>
        <div className="gameName">
          <span>
            {gameName} {bomba && 'ΜΠΟΜΠΑ '}
            {tablo === TABLOS.DIPLO && (
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
            <span>ΜΠΑΛΑΝΤΕΡ</span> και οι <span>ΝΤΑΜΕΣ</span>
          </div>
        )}
        {(crossObligation || targetObligation) && (
          <div>
            <span>ΥΠΟΧΡΕΩΣΗ </span> το <span>ΚΕΝΤΡΟ</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default GameInfo
