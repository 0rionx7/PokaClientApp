import { colorClass } from '@utils/utilities-functions';

const LineScore = ({ lineScore, royalties, index }) => {
  const classColor = colorClass(lineScore);
  const gridArea = 'score-details-' + index;

  return (
    <div className="score-details" style={{ gridArea }}>
      <div className={'row-score ' + classColor}>{lineScore}</div>
      <div className="row-royalties">{royalties[index]}</div>
    </div>
  );
};

export default LineScore;
