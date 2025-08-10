import { colorClass } from '@utils/utilities-functions';

const RoundScore = ({ roundScore, showScore }) => {
  if (!showScore) return <div className="round-score" />;

  return (
    <div className={`round-score ` + colorClass(roundScore)}>{roundScore}</div>
  );
};

export default RoundScore;
