import LineScore from '@chinese/components/LineScore';
import './LinesScore.scss';

const LinesScore = ({ playerState }) => {
  return (
    <>
      {playerState.linesScore.map((lineScore, i) => (
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
