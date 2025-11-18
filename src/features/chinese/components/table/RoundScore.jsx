import { getColorClass } from '@utils/helper-functions'

const RoundScore = ({ roundScore, showScore }) => {
  if (!showScore) return <div className="round-score" />

  return <div className={`round-score ` + getColorClass(roundScore)}>{roundScore}</div>
}

export default RoundScore
