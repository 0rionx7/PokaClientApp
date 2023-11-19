const StartingCard = ({ field }) => {
  return (
    <>
      <label htmlFor="startingCard">Μικρότερο χαρτί </label>
      <select id="startingCard" {...field}>
        {[2, 3, 4, 5, 6, 7].map(count => (
          <option key={count} value={count}>
            {count}
          </option>
        ))}
      </select>
    </>
  );
};

export default StartingCard;
