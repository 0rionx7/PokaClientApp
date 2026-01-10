import { cn, getColorClass } from '@utils/helper-functions'

const LineScore = ({ lineScore, royalties, index }) => {
  const classColor = getColorClass(lineScore)
  const gridArea = 'score-details-' + index

  return (
    <div className="score-details" style={{ gridArea }}>
      <div className={cn('row-score', classColor)}>{lineScore}</div>
      <div className="row-royalties">{royalties[index]}</div>
    </div>
  )
}

export default LineScore
