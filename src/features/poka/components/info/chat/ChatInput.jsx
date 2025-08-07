import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import EmojiPicker, { Theme } from 'emoji-picker-react';

import { useEmoji } from 'poka/components/info/chat/EmojiProvider';
import { selectUserName } from 'account/slice/accountSlice';
import { socket } from 'poka/api/pokaApi';
import { sendSvg } from 'assets/svgs/various';

const ChatInput = () => {
  const playerName = useSelector(selectUserName);
  const { gameId } = useParams();
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
          <button className="send-btn">{sendSvg}</button>
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
