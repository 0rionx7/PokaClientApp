import { useSelector } from 'react-redux';

import { selectPlayername } from 'features/account/accountSlice';
import RenderItem from 'componentsChinese/RenderItem';
import classes from './Table.module.scss';

const HandCards = () => {
  const username = useSelector(selectPlayername);
  const cards = useSelector(state => state.chineseGameState.hand);

  return (
    <div className={classes['hand-cards-chinese']}>
      {cards?.map((card, index) => (
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
