import { useParams } from 'react-router-dom';

import { useGetGameStateChineseQuery } from 'features/gameStateChinese/gameStateApi';
import useMessageService from 'hooks/useMessageService';
import LoadingSpinner from 'components/ui/LoadingSpinner';
import Table from 'componentsChinese/Table';
import EmojiProvider from 'components/info/chat/EmojiProvider';
import ChatBox from 'components/info/chat/ChatBox';
import Deck from 'componentsChinese/Deck';
import classes from './Table.module.scss';

const ChineseRoom = () => {
  const { gameId } = useParams();
  const { data } = useGetGameStateChineseQuery(gameId);

  useMessageService();

  if (!data) return <LoadingSpinner centered color="red" />;

  return (
    <div className={'room ' + classes.room}>
      <div className={'poker-table ' + classes['poker-table']}>
        <div className="tsoxa"></div>
      </div>
      <Table />
      <div className={'ribbon ' + classes.ribbon}>
        <EmojiProvider>
          <ChatBox className={classes['chat-chinese']} />
        </EmojiProvider>
        <Deck />
      </div>
    </div>
  );
};

export default ChineseRoom;
