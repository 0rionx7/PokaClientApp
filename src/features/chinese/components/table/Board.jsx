import { useSelector } from 'react-redux'

import { useGetChineseStateQuery } from '@chinese/api/chineseApi'
import { selectUserName } from '@account/api/accountApi'
import { fantasySvg, foulSvg } from '@icons/various'
import { cn, isSitting } from '@utils/helper-functions'
import usePlayerStyle from '@chinese/hooks/usePlayerStyle'
import PlayerRibbon from '@chinese/components/table/PlayerRibbon'
import RoundScore from '@chinese/components/table/RoundScore'
import LineScores from '@chinese/components/table/LineScores'
import BoardRow from '@chinese/components/table/BoardRow'
import Hand from '@chinese/components/table/Hand'
import useTimer from '@chinese/hooks/useTimer'
import classes from './Table.module.scss'
import './Board.scss'

const Board = ({ index, playerState }) => {
  const username = useSelector(selectUserName)
  const { data } = useGetChineseStateQuery()
  const gridArea = usePlayerStyle(index)
  const timerJsx = useTimer(playerState.playerName)

  const isHostBoard = playerState.playerName === username
  const { nextPlayers, playerStates } = data
  const isRoundEnd = nextPlayers.length <= playerStates.filter(isSitting).length

  return (
    <>
      <div className={cn('board-layout', classes[gridArea])} style={{ gridArea }}>
        <PlayerRibbon playerState={playerState} />
        <div className="board-grid">
          <div id={'timer' + playerState.playerName}>{timerJsx}</div>
          <RoundScore roundScore={playerState.roundScore} showScore={isRoundEnd} />
          <BoardRow rowIndex={0} playerState={playerState} />
          <BoardRow rowIndex={1} playerState={playerState} />
          <BoardRow rowIndex={2} playerState={playerState} />
          {playerState.isFoul && <div className="image-overlay">{foulSvg}</div>}
          {playerState.isFantasy && isRoundEnd && <div className="image-overlay">{fantasySvg}</div>}
        </div>
        {isRoundEnd && <LineScores playerState={playerState} />}
        {isHostBoard && <Hand />}
      </div>
    </>
  )
}

export default Board
