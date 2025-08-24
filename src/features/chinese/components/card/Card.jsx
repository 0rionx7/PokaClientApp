import { useDrag } from 'react-dnd';

import { SYMBOLS } from '@utils/text-constants';
import CardBack from '@components/card/CardBack';
import Content from '@components/card/Content';
import { suits } from '@icons/suits';

const Card = ({ card, owner }) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'card',
      canDrag: !card.locked,
      item: { card, owner },
      collect: monitor => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [card, owner]
  );

  if (card?.hidden) return <CardBack />;

  const className = `v-${card.value}`;

  return (
    <div
      className={`card ${className}`}
      ref={drag}
      style={{ backgroundColor: isDragging ? '#5e7043' : undefined }}>
      <div
        className={`value-suit_${card.suit}`}
        style={{ visibility: isDragging ? 'hidden' : 'visible' }}>
        <div className="value">{SYMBOLS[card.value] || card.value}</div>
        <img src={suits[card.suit]} alt={card.suit} />
      </div>
      <div
        className={`card-decoration ${className}`}
        style={{ visibility: isDragging ? 'hidden' : 'visible' }}>
        <Content card={card} />
      </div>
    </div>
  );
};

export default Card;
