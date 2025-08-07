import Button from '@ui/Button';

const BetOptionButton = ({ amount, color, ...rest }) => {
  const displayValue = amount >= 1000 ? amount / 1000 + 'K' : amount;
  const prompt = (
    <div className="bet-options">
      {`+ ${displayValue.toLocaleString()}`}
      <img src={`/chips/${color}.png`} alt="chip" />
    </div>
  );

  return <Button prompt={prompt} {...rest} type="button" />;
};

export default BetOptionButton;
