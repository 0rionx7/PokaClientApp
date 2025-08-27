import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { useGetPokaStateQuery } from '@poka/api/pokaApi';
import { createChipStack } from '@poka/utils/createChipStack';
import { formatNumber } from '@utils/helper-functions';

const ChipStack = ({ playerState }) => {
  const { gameId } = useParams();
  const {
    data: { chip },
  } = useGetPokaStateQuery(gameId);

  const amount = playerState.amountWon + playerState.currentBet;
  const chips = useMemo(() => createChipStack(amount, chip), [amount, chip]);

  return (
    <>
      {amount > 0 && (
        <div className="chips-grid">
          <div className="chips">{chips}</div>
          <div className="bet-amount">{formatNumber(amount)}</div>
        </div>
      )}
      {amount < 0 && (
        <div className="chips-grid">
          <div className="bet-amount">πάσο</div>
        </div>
      )}
    </>
  );
};

export default ChipStack;
