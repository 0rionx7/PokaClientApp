import { useGetChineseStateQuery } from '@chinese/api/chineseApi'
import { isSitting } from '@utils/helper-functions'
import './PlayerRibbon.scss'

const PlayerRibbon = ({ playerState }) => {
  const { data } = useGetChineseStateQuery()
  const { nextPlayers, round, playerStates } = data
  const [currentPlayer] = nextPlayers
  const showScore = nextPlayers.length === playerStates.filter(isSitting).length
  const isActive = playerState.playerName === currentPlayer || showScore
  const isDealing =
    playerStates[(round - 1) % playerStates.length].playerName === playerState.playerName
  // const isHostBoard = playerState.playerName === username;
  // const soundJsx = useSound({ ownBoard, isActive });

  return (
    <div className={'playerRibbon ' + (isActive ? 'active' : '')}>
      <h3>{playerState.playerName}</h3>
      {isDealing && <div className="dealer-icon">D</div>}
      <div className="score">{playerState.gameScore}</div>
      {/* {isHostBoard && soundJsx} */}
    </div>
  )
}

export default PlayerRibbon
