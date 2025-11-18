const Timer = ({ time, isActive }) => {
  const formatTime = (sec) =>
    sec > 0 ? `${Math.floor(sec / 60)}:${sec % 60 < 10 ? '0' + (sec % 60) : sec % 60}` : '0:00'
  const timeColor = time < 31 ? 'red' : 'bisque'

  return (
    <div
      className="timer"
      style={{
        color: timeColor,
        border: isActive ? '2px solid yellow' : 'none'
      }}
    >
      {formatTime(time)}
    </div>
  )
}

export default Timer
