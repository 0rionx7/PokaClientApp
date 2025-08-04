import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { selectPlayername } from 'features/account/accountSlice';
import { useGetGameStateChineseQuery } from 'features/gameStateChinese/gameStateApi';
import classes from './Table.module.scss';
import DraggableCard from 'componentsChinese/card/DraggableCard';

export default function Deck() {
  const username = useSelector(selectPlayername);
  const { gameId } = useParams();
  const { data } = useGetGameStateChineseQuery(gameId);
  const [showDeck, toggleDeck] = useState(false);
  const cards = data.deck;

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'd') toggleDeck(pr => !pr);
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (username !== 'Machine' || !showDeck) return null;

  return (
    <div className={classes.deck}>
      {cards?.map((card, index) => (
        <DraggableCard key={index} card={card} index={index} />
      ))}
    </div>
  );
}
