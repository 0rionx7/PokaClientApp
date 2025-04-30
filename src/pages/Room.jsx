import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGetGameStateQuery } from 'features/gameState/gameStateApi';
import EmojiProvider from 'components/info/chat/EmojiProvider';
import ActionContaineProvider from 'utils/ActionContainerContext';
import LoadingSpinner from 'components/ui/LoadingSpinner';
import useMessageService from 'hooks/useMessageService';
import Action from 'components/action/Action';
import Table from 'components/table/Table';
import Info from 'components/info/Info';
import './Room.scss';

const Room = () => {
  const { gameId } = useParams();
  const { data } = useGetGameStateQuery(gameId);
  const [hideInfo, toggleHideInfo] = useState(false);
  useMessageService();

  if (!data) return <LoadingSpinner centered color="red" />;

  return (
    <div className="room">
      <ActionContaineProvider>
        <Table />
        <div className="ribbon">
          <EmojiProvider>
            <Info
              hideInfo={hideInfo}
              toggleHideInfo={() => toggleHideInfo(curr => !curr)}
            />
          </EmojiProvider>
          <Action hideInfo={hideInfo} />
        </div>
      </ActionContaineProvider>
    </div>
  );
};

export default Room;
