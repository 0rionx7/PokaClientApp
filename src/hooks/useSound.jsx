import { useState, useEffect } from 'react'

import sound from '.@assets/sounds/plays.mp3'
import { soundOffSvg, soundOnSvg } from '@icons/various'

const useSound = ({ isActive, ownBoard }) => {
  const [audio] = useState(() => new Audio(sound))
  const [isOn, setIsOn] = useState(true)

  useEffect(() => {
    if (isOn && isActive && ownBoard) audio.play()
  }, [isOn, audio, isActive, ownBoard])

  return (
    <>
      {ownBoard && (
        <div
          style={{
            position: 'fixed',
            top: '22px',
            right: '25px',
            width: '40px',
            cursor: 'pointer'
          }}
          onClick={() => setIsOn(!isOn)}
        >
          {isOn ? soundOnSvg : soundOffSvg}
        </div>
      )}
    </>
  )
}

export default useSound
