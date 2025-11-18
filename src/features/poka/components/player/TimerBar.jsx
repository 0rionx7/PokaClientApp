import useTimerBar from '@poka/hooks/useTimerBar'

const TimerBar = ({ playerState }) => {
  const { show, width, backgroundColor } = useTimerBar(playerState)

  return (
    <div className="timer-bar">
      {show && <div className="timer-fragment" style={{ width: `${width}%`, backgroundColor }} />}
      <div className="line" />
    </div>
  )
}

export default TimerBar
