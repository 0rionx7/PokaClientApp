import { useDrag } from 'react-dnd';

import { suits, symbols } from 'assets/svgs/suits';
import Content from 'components/card/Content';

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

  if (card?.hidden)
    return (
      <div className="card" style={{ padding: '.17rem' }}>
        <div className="back-side" />
      </div>
    );
  const classes = `card v-${card.value}`;

  return (
    <div
      className={classes}
      ref={drag}
      style={{ backgroundColor: isDragging ? '#5e7043' : undefined }}>
      <div
        className={`value-suit_${card.suit}`}
        style={{ visibility: isDragging ? 'hidden' : 'visible' }}>
        <div className="value">{symbols[card.value] || card.value}</div>
        <div className="suit">{suits[card.suit]}</div>
      </div>
      <div
        className={'card-decoration v-' + card.value}
        style={{ visibility: isDragging ? 'hidden' : 'visible' }}>
        <Content card={card} />
      </div>
    </div>
  );
};

export default Card;
