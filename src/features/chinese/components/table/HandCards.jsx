import { useSelector } from 'react-redux';

import { selectHandcards } from '@chinese/slice/chineseStateSlice';
import { selectUserName } from '@account/api/accountApi';
import RenderItem from '@chinese/components/card/RenderItem';
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
          place="handCards"
        />
      ))}
    </div>
  );
};

export default HandCards;
