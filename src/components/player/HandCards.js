import { memo, useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { useGetGameStateQuery } from 'features/gameState/gameStateApi';
import { createChipStack } from 'lib/createChipStack';
import Card from 'components/card/Card';
import './HandCards.scss';

const HandCards = ({
  cards,
  canBeSelected,
  bet,
  playingIndex,
  chipsPosition,
}) => {
  const { gameId } = useParams();
  const { data } = useGetGameStateQuery(gameId);
  const [renderCards, setRenderCards] = useState(cards);

  const chips = useMemo(
    () => createChipStack(bet, data.chip),
    [bet, data.chip]
  );

  useEffect(() => {
    let timer;
    const timeout = playingIndex * 60;
    timer = setTimeout(() => {
      setRenderCards(cards);
    }, timeout);

    return () => clearTimeout(timer);
  }, [playingIndex, cards]);

  return (
    <div className={'hand-cards cards-' + cards?.length}>
      {renderCards?.map((card, i) => (
        <Card key={i} card={card} canBeSelected={canBeSelected} />
      ))}
      {bet > 0 && (
        <div className="bet-grid" style={chipsPosition}>
          <div className="chips">{chips}</div>
          <div className="bet-amount">{bet.toLocaleString()}</div>
        </div>
      )}
      {bet < 0 && (
        <div className="bet-grid" style={chipsPosition}>
          <div className="bet-amount">πάσο</div>
        </div>
      )}
    </div>
  );
};

export default memo(HandCards);
