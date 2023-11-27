import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGetGameStateQuery } from 'features/gameStateSlice/gameApi';
import LoadingSpinner from 'components/ui/LoadingSpinner';
import useMessageService from 'hooks/useMessageService';
import Action from 'components/action/Action';
import Table from 'components/table/Table';
import Info from 'components/info/Info';
import './Room.scss';

const Room = () => {
  const { gameId } = useParams();
  const { data } = useGetGameStateQuery(gameId);
  useMessageService();
  const [hideInfo, toggleHideInfo] = useState(false);

  if (!data) return <LoadingSpinner centered color="red" />;

  return (
    <div className="room">
      <Table />
      <div className="ribbon">
        <Info
          hideInfo={hideInfo}
          toggleHideInfo={() => toggleHideInfo(curr => !curr)}
        />
        <Action hideInfo={hideInfo} />
      </div>
    </div>
  );
};

export default Room;
