import { useGetPokaStateQuery } from '@poka/api/pokaApi';
import { formatNumber } from '@utils/helper-functions';
import './Chip.scss';
import { calculateChipCounts } from '@poka/utils/calculateChipCounts';
import Chips from '@poka/components/player/Chips';

const ChipStack = ({ playerState }) => {
  const {
    data: { chip },
  } = useGetPokaStateQuery();

  const amount = playerState.amountWon + playerState.currentBet;

  const chips = calculateChipCounts(amount, chip);

  return (
    <>
      {amount > 0 && (
        <div className="chips-grid">
          <div className="chips">
            {Object.entries(chips).map((chipInfo) => (
              <Chips key={chipInfo[0]} chipInfo={chipInfo} />
            ))}
          </div>
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
