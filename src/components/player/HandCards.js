import { memo } from 'react';

import Card from 'components/card/Card';
import './HandCards.scss';

const HandCards = ({ cards, canBeSelected, bet }) => {
  return (
    <>
      <div className={'hand-cards cards-' + cards?.length}>
        {cards?.map((card, i) => (
          <Card key={i} card={card} canBeSelected={canBeSelected} />
        ))}
        {bet > 0 && <div className="bet-amount">{bet.toLocaleString()}</div>}
        {bet < 0 && <div className="bet-amount">πάσο</div>}
      </div>
    </>
  );
};

export default memo(HandCards);
