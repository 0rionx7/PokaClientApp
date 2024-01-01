import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useGetGameStateQuery } from 'features/gameState/gameStateApi';
import { toggleSelectedCard } from 'features/gameState/gameStateSlice';
import { suits, symbols } from 'assets/svgs/suits';
import Content from 'components/card/Content';
import { cardBack } from 'assets/svgs/various';
import './Card.scss';

const Card = ({ card, canBeSelected }) => {
  const { gameId } = useParams();
  const { data } = useGetGameStateQuery(gameId);
  const dispatch = useDispatch();

  if (!card?.faceUp)
    return (
      <div className="card">
        <div className="back-side">{cardBack}</div>
      </div>
    );

  const toggleCardSelected = () => {
    if (canBeSelected) dispatch(toggleSelectedCard(card));
  };

  const classes =
    `card v-${card.value} ` +
    (card.selected ? 'selected ' : '') +
    (data.joker === card.value ? 'joker' : '');

  return (
    <div className={classes} onClick={toggleCardSelected}>
      <div className={`value-suit_${card.suit}`}>
        <div className="value">{symbols[card.value] || card.value}</div>
        <div>{suits[card.suit]}</div>
      </div>
      <div className={'card-decoration v-' + card.value}>
        <Content card={card} />
      </div>
    </div>
  );
};

export default Card;
