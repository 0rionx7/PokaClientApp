import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import DraggableCard from '@chinese/components/card/DraggableCard';
import { useGetChineseStateQuery } from '@chinese/api/chineseApi';
import { selectUserName } from '@account/slice/accountSlice';
import classes from './Table.module.scss';

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
