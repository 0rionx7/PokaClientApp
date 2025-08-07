import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { toggleSelectedCard } from 'poka/slice/pokaStateSlice';
import { useGetPokaStateQuery } from 'poka/api/pokaApi';
import { selectDeckColor } from 'account/slice/accountSlice';
import { suits, symbols } from 'assets/svgs/suits';
import Content from 'poka/components/card/Content';
import ToolTip from 'ui/ToolTip';
import './Card.scss';

const Card = ({ card, canBeSelected, noColor }) => {
  const deckColor = useSelector(selectDeckColor);
  const { gameId } = useParams();
  const { data } = useGetPokaStateQuery(gameId);
  const dispatch = useDispatch();

  if (!card?.faceUp)
    return (
      <div className="card" style={{ padding: '.17rem' }}>
        <div className="back-side" style={{ backgroundColor: deckColor }} />
      </div>
    );

  const toggleCardSelected = () => {
    if (canBeSelected) dispatch(toggleSelectedCard(card));
  };

  const isJoker = data.joker.some(value => value === card.value);
  const classes =
    `card v-${card.value} ` +
    (card.selected ? 'selected ' : '') +
    (isJoker && !noColor ? 'joker' : '');

  return (
    <div className={classes} onClick={toggleCardSelected}>
      <div className={`value-suit_${card.suit}`}>
        <div className="value">{symbols[card.value] || card.value}</div>
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
