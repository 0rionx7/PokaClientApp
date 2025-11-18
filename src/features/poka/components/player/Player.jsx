import PlayerInfo from '@poka/components/player/PlayerInfo'
import HandCards from '@poka/components/player/HandCards'
import useSitOutTimer from '@poka/hooks/useSitOutTimer'
import usePlayerClass from '@poka/hooks/usePlayerClass'
import ChipStack from '@poka/components/player/ChipStack'
import './Player.scss'

const Player = ({ playerState }) => {
  const { playerName } = playerState
  const { className, gridArea } = usePlayerClass(playerName)
  useSitOutTimer(playerState)

  return (
    <div className={className} style={{ gridArea }}>
      <HandCards playerState={playerState} />
      <ChipStack playerState={playerState} />
      <div className="player-info">
        <PlayerInfo playerState={playerState} />
        <div className="avatar">{playerName.slice(0, 1)}</div>
      </div>
    </div>
  )
}

export default Player
