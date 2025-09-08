const Chip = ({ count, color }) => {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className={`chip ${color}`}></div>
      ))}
    </>
  );
};

export default Chip;
