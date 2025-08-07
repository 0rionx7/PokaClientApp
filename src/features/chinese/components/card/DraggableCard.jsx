import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useParams } from 'react-router-dom';

import { useReorderDeckMutation } from 'chinese/api/chineseApi';
import { suits, symbols } from 'assets/svgs/suits';
import Content from 'chinese/components/card/Content';

const DraggableCard = ({ card, index }) => {
  const { gameId } = useParams();
  const [reorder] = useReorderDeckMutation();
  const ref = useRef(null);
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'card',
      item: { card, dragIndex: index },
      collect: monitor => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [card]
  );
  const [_, drop] = useDrop(
    () => ({
      accept: 'card',
      drop: ({ card, dragIndex }) =>
        reorder({ dragIndex, dropIndex: index, gameId }),
    }),
    [index]
  );

  const classes = `card v-${card.value}`;
  drag(drop(ref));

  return (
    <div
      className={classes}
      ref={ref}
      style={{
        backgroundColor: isDragging
          ? '#5e7043'
          : (index + 1) % 3 === 0
          ? 'orange'
          : undefined,
        height: 'calc(0.97 * var(--card-height))',
        zIndex: 101,
      }}>
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

export default DraggableCard;
