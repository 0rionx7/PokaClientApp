import { useSelector } from 'react-redux'

import { selectPlayerStates } from '@poka/api/pokaApi'
import PlayerResult from '@poka/components/info/PlayerResult'
import './Results.scss'

const Results = () => {
  const playerStates = useSelector(selectPlayerStates)

  const orderedPlayerStates = playerStates.toSorted(
    (a, b) =>
      b.amountWon - a.amountWon ||
      b.handInfo.handValue - a.handInfo.handValue ||
      Number(b.sittingOut) - Number(a.sittingOut)
  )
  return (
    <div className="results-board">
      <div className="player-result">
        <span>Κατ.</span>
        <span style={{ overflow: 'hidden' }}>Παίκτης</span>
        <span>&quot;Φύλο&quot;</span>
        <span>Κέρδη/Απώλ.</span>
      </div>
      {orderedPlayerStates.map((playerState) => (
        <PlayerResult playerState={playerState} key={playerState.playerName} />
      ))}
    </div>
  )
}

export default Results
