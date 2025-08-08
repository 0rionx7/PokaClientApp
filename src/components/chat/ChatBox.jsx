import { AppErrorBoundary } from '@utils/AppErrorBoundary';
import ChatInput from '@components/chat/ChatInput';
import Messages from '@components/chat/Messages';
import './ChatBox.scss';

const ChatBox = ({ className }) => {
  return (
    <AppErrorBoundary
      fallback={
        <div className="chat-error">
          Ζητούμε συγγνώμη, η συνομιλία δεν είναι δυνατή αυτήν την στιγμή.
        </div>
      }>
      <div className={'chat-box ' + (className || '')}>
        <Messages />
        <ChatInput />
      </div>
    </AppErrorBoundary>
  );
};

export default ChatBox;
