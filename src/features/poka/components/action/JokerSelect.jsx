import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { selectHostPlayerState, useGetPokaStateQuery } from '@poka/api/pokaApi';
import { orderNumber, suitName } from '@utils/text-constants';
import JokerSubmit from '@poka/components/action/JokerSubmit';
import { symbols } from '@utils/text-constants';
import Card from '@poka/components/card/Card';
import Button from '@ui/Button';
import './JokerSelect.scss';

const JokerSelect = () => {
  const { gameId } = useParams();
  const { data } = useGetPokaStateQuery(gameId);
  const { handCards } = useSelector(selectHostPlayerState(gameId));
  const [jokers, setJokers] = useState([]);
  const [suit, setSuit] = useState('S');
  const [cardValue, setCardValue] = useState(14);

  const jokerCount = handCards.filter(card =>
    data.joker.some(value => card.value === value)
  ).length;
  const card = { value: cardValue, suit, faceUp: true };

  const prompt = jokerCount > 1 && orderNumber[jokers.length];

  if (jokerCount === jokers.length)
    return <JokerSubmit jokers={jokers} resetJokers={() => setJokers([])} />;

  return (
    <div className="card-container">
      <div className="selections">
        ΑΝΤΙΚΑΤΑΣΗ ΤΟΥ {prompt} ΜΠΑΛΑΝΤΕΡ ΜΕ
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
      <Button
        prompt="ΕΠΙΛΟΓΗ"
        onClick={() => setJokers(curr => [...curr, card])}
      />
    </div>
  );
};

export default JokerSelect;
