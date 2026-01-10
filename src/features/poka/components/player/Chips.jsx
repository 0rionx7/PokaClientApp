import { cn } from '@utils/helper-functions'

const Chips = ({ chips }) => {
  const renderChips = chips.slice(0, 70)

  return (
    <>
      {renderChips.map((color, i) => (
        <div key={i} className={cn('chip', color)}></div>
      ))}
    </>
  )
}

export default Chips
