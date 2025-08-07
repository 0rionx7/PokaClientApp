import { useSelector } from 'react-redux';

import { selectHandcards } from 'features/chinese/slice/chineseStateSlice';
import { selectUserName } from 'features/account/slice/accountSlice';
import RenderItem from 'features/chinese/components/RenderItem';
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
