import CardBack from '@components/card/CardBack';
import { SYMBOLS } from '@utils/text-constants';
import { suits } from 'assets/svgs/suits';
import Content from '@components/card/Content';
import ToolTip from '@ui/ToolTip';
import '@components/card/Card.scss';

const Card = ({ card, onSelect, isChosen, isJoker }) => {
  if (card === null) return null; // for auxilary cards

  if (!card?.faceUp) return <CardBack />;

  const cardClass = [
    'card',
    `v-${card.value}`,
    (isChosen || card.selected) && 'selected',
    isJoker && 'joker',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cardClass} onClick={onSelect}>
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
