import { useParams } from 'react-router-dom';

import { useGetChineseStateQuery } from '@chinese/api/chineseApi';
import useMessageService from '@hooks/useMessageService';
import LoadingSpinner from '@ui/LoadingSpinner';
import Table from '@chinese/components/Table';
import EmojiProvider from '@poka/components/info/chat/EmojiProvider';
import ChatBox from '@poka/components/info/chat/ChatBox';
import Deck from '@chinese/components/Deck';
import classes from './Table.module.scss';

const ChineseRoom = () => {
  const { gameId } = useParams();
  const { data } = useGetChineseStateQuery(gameId);

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
