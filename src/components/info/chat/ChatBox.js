import { AppErrorBoundary } from 'utils/AppErrorBoundary';
import ChatInput from 'components/info/chat/ChatInput';
import Messages from 'components/info/chat/Messages';
import './ChatBox.scss';

const ChatBox = () => {
  return (
    <AppErrorBoundary
      fallback={
        <div className="chat-error">
          Ζητούμε συγγνώμη, η συνομιλία δεν είναι δυνατή αυτήν την στιγμή.
        </div>
      }>
      <div className="chat-box">
        <Messages />
        <ChatInput />
      </div>
    </AppErrorBoundary>
  );
};

export default ChatBox;
