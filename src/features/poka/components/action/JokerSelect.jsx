import { useState } from 'react';
import { useSelector } from 'react-redux';

import { selectHostPlayerState, useGetPokaStateQuery } from '@poka/api/pokaApi';
import { ORDER_NUMBER, SUIT_NAME } from '@utils/text-constants';
import JokerSubmit from '@poka/components/action/JokerSubmit';
import { SYMBOLS } from '@utils/text-constants';
import Card from '@poka/components/card/Card';
import Button from '@ui/Button';
import './JokerSelect.scss';

const JokerSelect = () => {
  const {
    data: { joker, startingCard },
  } = useGetPokaStateQuery();
  const { handCards } = useSelector(selectHostPlayerState);
  const [replacementCards, setReplacmentCards] = useState([]);
  const [suit, setSuit] = useState('S');
  const [cardValue, setCardValue] = useState(14);

  const jokerCount = handCards.filter((card) =>
    joker.some((value) => card.value === value)
  ).length;
  const card = { value: cardValue, suit, faceUp: true };

  const prompt = jokerCount > 1 && ORDER_NUMBER[replacementCards.length];

  if (jokerCount === replacementCards.length)
    return (
      <JokerSubmit
        replacmentCards={replacementCards}
        resetReplacments={() => setReplacmentCards([])}
      />
    );

  return (
    <div className="card-container">
      <div className="selections">
        ΑΝΤΙΚΑΤΑΣΗ ΤΟΥ {prompt} ΜΠΑΛΑΝΤΕΡ ΜΕ
        <select
          value={cardValue}
          onChange={(e) => setCardValue(+e.target.value)}
        >
          {[...Array(15).keys()].slice(startingCard).map((value) => (
            <option key={value} value={value}>
              {SYMBOLS[value] || value}
            </option>
          ))}
        </select>
        <select value={suit} onChange={(e) => setSuit(e.target.value)}>
          {['C', 'H', 'S', 'D'].map((suit) => (
            <option key={suit} value={suit}>
              {SUIT_NAME[suit]}
            </option>
          ))}
        </select>
      </div>
      <Card card={card} />
      <Button
        prompt="ΕΠΙΛΟΓΗ"
        onClick={() => setReplacmentCards((curr) => [...curr, card])}
      />
    </div>
  );
};

export default JokerSelect;
