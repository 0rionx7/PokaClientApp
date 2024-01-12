import { describeTime } from 'lib/text-functions';

const Reaction = ({ field }) => {
  const reactionTimes = [30, 45, 60, 90, 101];

  return (
    <>
      <label htmlFor="reaction">Χρόνος αντίδρασης</label>
      <select id="reaction" {...field}>
        {reactionTimes.map(secs => (
          <option key={secs} value={secs}>
            {describeTime(secs)}
          </option>
        ))}
      </select>
    </>
  );
};

export default Reaction;
