import LineScore from '@chinese/components/table/LineScore';
import './LinesScore.scss';

const LineScores = ({ playerState }) => {
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

export default LineScores;
