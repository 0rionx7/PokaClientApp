import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import EmojiPicker, { Theme } from 'emoji-picker-react';

import { useEmoji } from 'components/info/chat/EmojiProvider';
import { socket } from 'features/gameStateSlice/gameApi';
import { sendSvg } from 'assets/svgs/various';

const ChatInput = () => {
  const { gameId } = useParams();
  const playerName = useSelector(state => state.auth.username);
  const { showPicker, setShowPicker } = useEmoji();
  const [message, setMessage] = useState('');
  const inputRef = useRef();

  const handleSubmit = event => {
    event.preventDefault();
    socket.emit('postMessage', { gameId, playerName, message });
    setShowPicker(false);
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
            placeholder="εισάγετε το μήνυμα σας"
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
