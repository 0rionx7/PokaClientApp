import { figures } from '@icons/figures'
import { suits } from '@icons/suits'
import './Card.scss'

const Figure = ({ card }) => {
  const figure = card.value === 11 ? 'jack' : card.value === 12 ? 'queen' : 'king'

  return (
    <div className="silhouette-suit">
      <img src={suits[card.suit]} alt={card.suit} />
      <img src={figures[figure]} alt={figure} />
      <img src={suits[card.suit]} alt={card.suit} />
    </div>
  )
}

export default Figure
