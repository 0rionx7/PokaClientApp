import Button from 'components/ui/Button';

const BetOptionButton = ({ amount, color, ...rest }) => {
  const displayValue = amount >= 1000 ? amount / 1000 + 'K' : amount;
  const prompt = (
    <div className="bet-options">
      {`+ ${displayValue.toLocaleString()}`}
      <img
        src={`${import.meta.env.VITE_IMAGE_URL}/assets/chips/${color}.png`}
        alt="chip"
      />
    </div>
  );

  return <Button prompt={prompt} {...rest} type="button" />;
};

export default BetOptionButton;
