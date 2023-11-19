import ChatInput from 'src/components/info/chat/ChatInput';
import Messages from 'src/components/info/chat/Messages';
import './ChatBox.scss';
import { ChatErrorBoundary } from 'src/components/info/chat/ChatErrorBoundary';

const ChatBox = () => {
  return (
    <ChatErrorBoundary
      fallback={
        <div className="chat-error">
          Ζητούμε συγγνώμη, η συνομιλία δεν είναι δυνατή αυτήν την στιγμή.{' '}
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
