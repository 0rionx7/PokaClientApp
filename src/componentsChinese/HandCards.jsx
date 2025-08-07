import { useSelector } from 'react-redux';

import { selectHandcards } from 'features/chinese/chineseStateSlice';
import { selectUserName } from 'features/account/accountSlice';
import RenderItem from 'componentsChinese/RenderItem';
import classes from './Table.module.scss';

const HandCards = () => {
  const username = useSelector(selectUserName);
  const handCards = useSelector(selectHandcards);

  return (
    <div className={classes['hand-cards-chinese']}>
      {handCards?.map((card, index) => (
        <RenderItem
          key={index}
          card={card}
          index={index}
          owner={username}
          place="hand"
        />
      ))}
    </div>
  );
};

export default HandCards;
