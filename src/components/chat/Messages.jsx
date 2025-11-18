import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

import { selectMessagess } from '@account/slice/accountSlice'
import Message from '@components/chat/Message'
import './ChatBox.scss'

const Messages = () => {
  const messages = useSelector(selectMessagess)
  const container = useRef()

  useEffect(() => {
    container.current.scrollTop = container.current.scrollHeight
  }, [messages.length])

  return (
    <div className="messages-container">
      <div ref={container} className="messages">
        {messages.map((data, i) => (
          <Message key={i} data={data} />
        ))}
      </div>
    </div>
  )
}

export default Messages
