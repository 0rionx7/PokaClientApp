import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useGetGameStateQuery } from 'features/gameState/gameStateApi';
import { orderNumber, suitName } from 'common/text-constants';
import { addJoker } from 'features/gameState/gameStateSlice';
import JokerSubmit from 'components/action/JokerSubmit';
import { symbols } from 'assets/svgs/suits';
import Button from 'components/ui/Button';
import Card from 'components/card/Card';
import './JokerSelect.scss';

const JokerSelect = () => {
  const dispatch = useDispatch();
  const { gameId } = useParams();
  const { data } = useGetGameStateQuery(gameId);
  const handCards = useSelector(state => state.gameState.handCards);
  const jokers = useSelector(state => state.gameState.jokers);
  const [cardValue, setCardValue] = useState(14);
  const [suit, setSuit] = useState('S');

  const jokerCount = handCards.filter(card => card.value === data.joker).length;
  const card = { value: cardValue, suit, faceUp: true };

  const prompt = jokerCount > 1 && orderNumber[jokers.length];

  if (jokerCount === jokers.length) return <JokerSubmit />;

  return (
    <div className="card-container">
      <div className="selections">
        ΟΡΙΣΤΕ ΧΑΡΤΙ ΓΙΑ ΤΟ {prompt} ΜΠΑΛΑΝΤΕΡ
        <select value={cardValue} onChange={e => setCardValue(+e.target.value)}>
          {[...Array(15).keys()].slice(data.startingCard).map(value => (
            <option key={value} value={value}>
              {symbols[value] || value}
            </option>
          ))}
        </select>
        <select value={suit} onChange={e => setSuit(e.target.value)}>
          {['C', 'H', 'S', 'D'].map(suit => (
            <option key={suit} value={suit}>
              {suitName[suit]}
            </option>
          ))}
        </select>
      </div>
      <Card card={card} />
      <Button prompt="ΕΠΙΛΟΓΗ" onClick={() => dispatch(addJoker(card))} />
    </div>
  );
};

export default JokerSelect;
