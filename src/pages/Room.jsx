import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGetGameStateQuery } from 'features/poka/pokaApi';
import EmojiProvider from 'components/info/chat/EmojiProvider';
import ActionContaineContextProvider from 'utils/ActionContainerContext';
import LoadingSpinner from 'components/ui/LoadingSpinner';
import useMessageService from 'hooks/useMessageService';
import Action from 'components/action/Action';
import Table from 'components/table/Table';
import Info from 'components/info/Info';
import './Room.scss';

const Room = () => {
  const { gameId } = useParams();
  const { data } = useGetGameStateQuery(gameId);
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
