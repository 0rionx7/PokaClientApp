import { useSelector } from 'react-redux'

import { selectPlayerStates, useGetPokaStateQuery } from '@poka/api/pokaApi'
import { selectUserName } from '@account/api/accountApi'
import { getPlayerPosition } from '@poka/utils/getPlayerPosition'
import { playerStateOf } from '@utils/helper-functions'

const usePlayerClass = (playerName) => {
  const { data } = useGetPokaStateQuery()
  const hostPlayerName = useSelector(selectUserName)
  const playerStates = useSelector(selectPlayerStates)

  const playersCount = playerStates.length
  const hostIndex = playerStates.findIndex(playerStateOf(hostPlayerName))
  const playerIndex = playerStates.findIndex(playerStateOf(playerName))

  let seat
  if (data.rotation === 'clockwise') {
    seat =
      hostIndex <= playerIndex
        ? playerIndex - hostIndex + 1
        : playersCount + 1 - (hostIndex - playerIndex)
  } else {
    seat =
      hostIndex < playerIndex
        ? playersCount + 1 - (playerIndex - hostIndex)
        : hostIndex - playerIndex + 1
  }
  const position = getPlayerPosition(playersCount, seat)
  const gridArea = `player-${seat}`
  const className = `player seat-${seat} ${position}`

  return { className, gridArea }
}

export default usePlayerClass
