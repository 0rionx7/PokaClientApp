import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import EmojiPicker, { Theme } from 'emoji-picker-react';

import { socket } from 'features/gameApi/gameApi';
import { sendSvg } from 'assets/svgs/various';

const ChatInput = () => {
  const playerName = useSelector(state => state.auth.username);
  const gameId = useSelector(state => state.gameState.gameId);
  const [showPicker, setShowPicker] = useState(false);
  const [message, setMessage] = useState('');
  const inputRef = useRef();

  const handleSubmit = event => {
    event.preventDefault();
    setShowPicker(false);
    socket.emit('postMessage', { gameId, playerName, message });
    setMessage('');
  };

  const emojiPicked = emojiObject => {
    setMessage(prevInput => prevInput + emojiObject.emoji);
    inputRef.current.focus();
  };

  return (
    <>
      <form className="chat-input" onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            ref={inputRef}
            value={message}
            onChange={e => setMessage(e.target.value)}
            className="text-input"
            placeholder="πληκτρολογήστε το μήνυμα σας"
          />
          <button>{sendSvg}</button>
        </div>
        <p onClick={() => setShowPicker(pr => !pr)}> &#128522;</p>
      </form>
      {showPicker && (
        <div className="emoji-picker">
          <EmojiPicker
            onEmojiClick={emojiPicked}
            theme={Theme.DARK}
            emojiStyle="facebook"
            suggestedEmojisMode="recent"
            lazyLoadEmojis={true}
          />
        </div>
      )}
    </>
  );
};

export default ChatInput;
