import { useSelector } from 'react-redux';

import { selectHandcards } from 'features/gameStateChinese/gameStateSlice';
import { selectPlayername } from 'features/account/accountSlice';
import RenderItem from 'componentsChinese/RenderItem';
import classes from './Table.module.scss';

const HandCards = () => {
  const username = useSelector(selectPlayername);
  const hand = useSelector(selectHandcards);

  return (
    <div className={classes['hand-cards-chinese']}>
      {hand?.map((card, index) => (
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
