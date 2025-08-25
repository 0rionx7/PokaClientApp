import LineScore from '@chinese/components/table/LineScore';
import './LinesScore.scss';

const LinesScore = ({ playerState }) => {
  return (
    <>
      {playerState.lineScores.map((lineScore, i) => (
        <LineScore
          key={i}
          index={i}
          lineScore={lineScore}
          royalties={playerState.royalties}
        />
      ))}
    </>
  );
};

export default LinesScore;
