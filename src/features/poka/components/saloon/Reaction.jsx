import { describeTime } from '@utils/text-functions';

const Reaction = () => {
  const reactionTimes = [30, 45, 60, 90, 101];

  return (
    <>
      <label htmlFor="reaction">Χρόνος αντίδρασης</label>
      <select id="reaction" name="reaction" defaultValue={101}>
        {reactionTimes.map((secs) => (
          <option key={secs} value={secs}>
            {describeTime(secs)}
          </option>
        ))}
      </select>
    </>
  );
};

export default Reaction;
