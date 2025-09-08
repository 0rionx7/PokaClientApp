import { useMemo } from 'react';

import { useGetPokaStateQuery } from '@poka/api/pokaApi';
import { createChipStack } from '@poka/utils/createChipStack';
import { formatNumber } from '@utils/helper-functions';
import './Chip.scss';

const Chips = ({ playerState }) => {
  const {
    data: { chip },
  } = useGetPokaStateQuery();

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

export default Chips;
