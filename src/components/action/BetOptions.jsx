import { useParams } from 'react-router-dom';

import { useGetGameStateQuery } from 'features/gameState/gameStateApi';
import BetOptionButton from 'components/action/BetOptionButton';

const BetOptions = ({ betAmount, setBetAmount, disabled, validate }) => {
  const { gameId } = useParams();
  const {
    data: { chip },
  } = useGetGameStateQuery(gameId);

  const betAmounts = [+chip, 5 * chip, 25 * chip, 100 * chip];
  const colors = ['green', 'black', 'yellow', 'red'];

  const handleIncrese = amount => {
    const newAmount = betAmount ? betAmount + amount : amount;
    validate(newAmount);
    setBetAmount(newAmount);
  };

  return (
    <>
      {betAmounts.map((amount, i) => (
        <BetOptionButton
          key={amount}
          amount={amount}
          color={colors[i]}
          onClick={() => handleIncrese(amount)}
          disabled={disabled}
          style={{ gridArea: 'b-' + amount / chip }}
          className="bet-option orange"
        />
      ))}
    </>
  );
};

export default BetOptions;
