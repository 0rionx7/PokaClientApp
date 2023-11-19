import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { createMessageJsx } from 'src/common/createMsgJsx';
import './ChatBox.scss';

const Messages = () => {
  const messages = useSelector(state => state.gameState.messages);
  const container = useRef();

  const messagesJsx = messages.map(createMessageJsx);

  useEffect(() => {
    container.current.scrollTop = container.current.scrollHeight;
  }, [messages.length]);

  return (
    <div className="messages-container">
      <div ref={container} className="messages">
        {messagesJsx}
      </div>
    </div>
  );
};

export default Messages;
