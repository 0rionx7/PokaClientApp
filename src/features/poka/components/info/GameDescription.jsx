import { useSelector } from 'react-redux'

import { selectChosenGame } from '@poka/slice/pokaStateSlice'
import { useGetPokaStateQuery } from '@poka/api/pokaApi'
import { selectUserName } from '@account/api/accountApi'
import { getTableTitle } from '@utils/text-functions'
import { GAME_INFO } from '@utils/text-constants'
import './Info.scss'

const GameDescription = () => {
  const { data } = useGetPokaStateQuery()
  const hostPlayerName = useSelector(selectUserName)
  const chosenGame = useSelector(selectChosenGame)

  const { dealer, tableName } = data
  const gameName = hostPlayerName === dealer ? chosenGame : data.gameName
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
      <div className="info-container description">
        {Object.entries(GAME_INFO[gameName]).map(([title, info]) => (
          <div key={title}>
            <span>{title}</span> {info}
          </div>
        ))}
      </div>
    </div>
  )
}

export default GameDescription
