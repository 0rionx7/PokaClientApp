import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { selectUserName } from 'features/account/accountSlice';
import { useGetChineseStateQuery } from 'features/chinese/chineseApi';
import classes from './Table.module.scss';
import DraggableCard from 'componentsChinese/card/DraggableCard';

export default function Deck() {
  const username = useSelector(selectUserName);
  const { gameId } = useParams();
  const { data } = useGetChineseStateQuery(gameId);
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
