import { useAssignJokerMutation } from '@poka/api/pokaApi'
import Button from '@ui/Button'
import Card from '@poka/components/card/Card'

const JokerSubmit = ({ replacmentCards, resetReplacments }) => {
  const [assignJoker, { isLoading, isSuccess }] = useAssignJokerMutation()

  return (
    <div className="card-container">
      <div className="replace">
        ΑΝΤΙΚΑΤΑΣΤΑΣΗ ΜΠΑΛΑΝΤΕΡ ΜΕ:
        <div className="jokers">
          {replacmentCards.map((card, i) => (
            <Card card={card} key={i} />
          ))}
        </div>
      </div>
      <Button className="red" prompt="ΑΚΥΡΩΣΗ" onClick={resetReplacments} />
      <Button
        className="green"
        prompt="ΑΝΤΙΚΑΤΑΣΤΑΣΗ"
        onClick={() => assignJoker({ replacmentCards })}
        disabled={isLoading || isSuccess}
      />
    </div>
  )
}

export default JokerSubmit
