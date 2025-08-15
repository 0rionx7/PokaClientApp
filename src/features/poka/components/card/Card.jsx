import { useSelector } from 'react-redux';

import { selectDeckColor } from '@account/slice/accountSlice';
import { SYMBOLS } from '@utils/text-constants';
import Content from '@components/card/Content';
import { suits } from 'assets/svgs/suits';
import ToolTip from '@ui/ToolTip';
import '@components/card/Card.scss';

const Card = ({ card, onChoose, isChosen, isJoker }) => {
  const deckColor = useSelector(selectDeckColor);

  if (card === null) return null; // for auxilary cards

  if (!card?.faceUp)
    return (
      <div className="card" style={{ padding: '.17rem' }}>
        <div className="back-side" style={{ backgroundColor: deckColor }} />
      </div>
    );

  const cardClass = [
    'card',
    `v-${card.value}`,
    (isChosen || card.selected) && 'selected',
    isJoker && 'joker',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cardClass} onClick={onChoose}>
      <div className={`value-suit_${card.suit}`}>
        <div className="value">{SYMBOLS[card.value] || card.value}</div>
        <div className="suit">{suits[card.suit]}</div>
      </div>
      <div className={'card-decoration v-' + card.value}>
        <Content card={card} />
      </div>
      {isJoker && <ToolTip info="Joker" />}
    </div>
  );
};

export default Card;
