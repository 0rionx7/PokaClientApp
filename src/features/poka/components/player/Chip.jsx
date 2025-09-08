const Chip = ({ count, color }) => {
  const length = count < 70 ? count : 70;

  return (
    <>
      {Array.from({ length }, (_, i) => (
        <div key={i} className={`chip ${color}`}></div>
      ))}
    </>
  );
};

export default Chip;
