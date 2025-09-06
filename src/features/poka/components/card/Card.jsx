import CardBack from '@components/card/CardBack';
import { SYMBOLS } from '@utils/text-constants';
import Content from '@components/card/Content';
import ToolTip from '@ui/ToolTip';
import { suits } from '@icons/suits';
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
        <img src={suits[card.suit]} alt={card.suit} />
      </div>
      <div className={'card-decoration v-' + card.value}>
        <Content card={card} />
      </div>
      {isJoker && <ToolTip info="Joker" />}
    </div>
  );
};

export default Card;
