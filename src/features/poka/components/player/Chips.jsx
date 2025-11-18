const Chips = ({ chips }) => {
  const renderChips = chips.slice(0, 70)

  return (
    <>
      {renderChips.map((color, i) => (
        <div key={i} className={`chip ${color}`}></div>
      ))}
    </>
  )
}

export default Chips
