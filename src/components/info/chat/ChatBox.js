import { ChatErrorBoundary } from 'components/info/chat/ChatErrorBoundary';
import ChatInput from 'components/info/chat/ChatInput';
import Messages from 'components/info/chat/Messages';
import './ChatBox.scss';

const ChatBox = () => {
  return (
    <ChatErrorBoundary
      fallback={
        <div className="chat-error">
          Ζητούμε συγγνώμη, η συνομιλία δεν είναι δυνατή αυτήν την στιγμή.
        </div>
      }>
      <div className="chat-box">
        <Messages />
        <ChatInput />
      </div>
    </ChatErrorBoundary>
  );
};

export default ChatBox;
