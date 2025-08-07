import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { selectMessagess } from 'poka/slice/pokaStateSlice';
import { createMessageJsx } from 'poka/utils/createMsgJsx';
import './ChatBox.scss';

const Messages = () => {
  const messages = useSelector(selectMessagess);
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
