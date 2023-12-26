import { memo } from 'react';
import { useParams } from 'react-router-dom';

import { useGetGameStateQuery } from 'features/gameState/gameStateApi';
import Card from 'components/card/Card';
import useChips from 'hooks/useChips';
import './HandCards.scss';

const HandCards = ({ cards, canBeSelected, bet, style }) => {
  const { gameId } = useParams();
  const { data } = useGetGameStateQuery(gameId);
  const chips = useChips(bet, data.chip);

  return (
    <div className={'hand-cards cards-' + cards?.length}>
      {cards?.map((card, i) => (
        <Card key={i} card={card} canBeSelected={canBeSelected} />
      ))}
      {bet > 0 && (
        <div className="bet-grid" style={style}>
          <div className="chips">{chips}</div>
          <div className="bet-amount">{bet.toLocaleString()}</div>
        </div>
      )}
      {bet < 0 && (
        <div className="bet-grid" style={style}>
          <div className="bet-amount">πάσο</div>
        </div>
      )}
    </div>
  );
};

export default memo(HandCards);
