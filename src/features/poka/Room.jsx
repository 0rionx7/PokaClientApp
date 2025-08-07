import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGetPokaStateQuery } from 'poka/api/pokaApi';
import EmojiProvider from 'poka/components/info/chat/EmojiProvider';
import ActionContaineContextProvider from 'poka/utils/ActionContainerContext';
import LoadingSpinner from 'ui/LoadingSpinner';
import useMessageService from 'hooks/useMessageService';
import Action from 'poka/components/action/Action';
import Table from 'poka/components/table/Table';
import Info from 'poka/components/info/Info';
import './Room.scss';

const Room = () => {
  const { gameId } = useParams();
  const { data } = useGetPokaStateQuery(gameId);
  const [hideInfoPanel, setHideInfoPanel] = useState(false);
  useMessageService();

  if (!data) return <LoadingSpinner centered color="red" />;

  return (
    <div className="room">
      <ActionContaineContextProvider>
        <Table />
        <div className="ribbon">
          <EmojiProvider>
            <Info
              hideInfo={hideInfoPanel}
              onToggleInfoPanel={() => setHideInfoPanel(curr => !curr)}
            />
          </EmojiProvider>
          <Action hideInfo={hideInfoPanel} />
        </div>
      </ActionContaineContextProvider>
    </div>
  );
};

export default Room;
