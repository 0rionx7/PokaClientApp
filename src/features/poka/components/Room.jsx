import { useGetPokaStateQuery } from '@poka/api/pokaApi';
import EmojiProvider from '@components/chat/EmojiProvider';
import RoomContextProvider from '@poka/components/RoomContext';
import LoadingSpinner from '@ui/LoadingSpinner';
import useMessageService from '@hooks/useMessageService';
import Action from '@poka/components/action/Action';
import Table from '@poka/components/table/Table';
import Info from '@poka/components/info/Info';
import './Room.scss';

const Room = () => {
  const { data } = useGetPokaStateQuery();
  useMessageService();

  if (!data) return <LoadingSpinner centered color="red" />;

  return (
    <div className="room">
      <RoomContextProvider>
        <Table />
        <div className="ribbon">
          <EmojiProvider>
            <Info />
          </EmojiProvider>
          <Action />
        </div>
      </RoomContextProvider>
    </div>
  );
};

export default Room;
