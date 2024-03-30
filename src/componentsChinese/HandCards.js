import { useSelector } from 'react-redux';

import RenderItem from 'componentsChinese/RenderItem';
import './Hand.scss';

const HandCards = () => {
  const username = useSelector(state => state.account.username);
  const cards = useSelector(state => state.chineseGameState.hand);

  return (
    <div className="hand-cards">
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
