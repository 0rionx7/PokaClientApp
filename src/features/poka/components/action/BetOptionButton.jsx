import { formatNumber } from '@utils/helper-functions';
import Button from '@ui/Button';

const BetOptionButton = ({ amount, color, ...rest }) => {
  const displayValue = amount >= 1000 ? amount / 1000 + 'K' : amount;
  const prompt = (
    <div className="bet-options">
      {`+ ${formatNumber(displayValue)}`}
      <div className={`chip ${color}`}></div>
    </div>
  );

  return <Button prompt={prompt} {...rest} type="button" />;
};

export default BetOptionButton;
