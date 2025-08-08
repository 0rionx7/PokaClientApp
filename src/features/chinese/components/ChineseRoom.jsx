import { useState } from 'react';
import { useParams } from 'react-router-dom';

import EmojiProvider, { useEmoji } from '@components/chat/EmojiProvider';
import { useGetChineseStateQuery } from '@chinese/api/chineseApi';
import useMessageService from '@hooks/useMessageService';
import LoadingSpinner from '@ui/LoadingSpinner';
import Table from '@chinese/components/Table';
import ChatBox from '@components/chat/ChatBox';
import toggle from '@icons/toggle.svg';

const ChineseRoom = () => {
  const { gameId } = useParams();
  const { data } = useGetChineseStateQuery(gameId);
  const [showChat, setShowChat] = useState(true);
  const { setShowPicker } = useEmoji();
  useMessageService();

  const handleToggleInfoPanel = () => {
    setShowChat(pr => !pr);
    setShowPicker(false);
  };

  if (!data) return <LoadingSpinner centered color="red" />;

  const chatWidth = showChat ? '45%' : '0%';

  return (
    <div className="room" style={{ placeItems: 'center' }}>
      <div className="game-table" style={{ zIndex: -1 }}>
        <div className="tsoxa"></div>
      </div>
      <Table />
      <div
        className="ribbon"
        style={{ width: '100%', height: '100%', background: 'none' }}>
        <EmojiProvider>
          <div style={{ width: chatWidth }}>
            <ChatBox />
          </div>
          <div className="toggle-btn" onClick={handleToggleInfoPanel}>
            <img src={toggle} alt={'toggle'} />
          </div>
        </EmojiProvider>
      </div>
    </div>
  );
};

export default ChineseRoom;
