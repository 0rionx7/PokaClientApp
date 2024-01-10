import { memo, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { useGetGameStateQuery } from 'features/gameState/gameStateApi';
import { createChipStack } from 'lib/createChipStack';

const ChipStack = ({ playerState, chipsPosition }) => {
  const { gameId } = useParams();
  const { data } = useGetGameStateQuery(gameId);

  const amount = playerState.amountWon + playerState.currentBet;
  const chips = useMemo(
    () => createChipStack(amount, data.chip),
    [amount, data.chip]
  );

  return (
    <>
      {amount > 0 && (
        <div className="bet-grid" style={chipsPosition}>
          <div className="chips">{chips}</div>
          <div className="bet-amount">{amount.toLocaleString()}</div>
        </div>
      )}
      {amount < 0 && (
        <div className="bet-grid" style={chipsPosition}>
          <div className="bet-amount">πάσο</div>
        </div>
      )}
    </>
  );
};

export default memo(ChipStack);
