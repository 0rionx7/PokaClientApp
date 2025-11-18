import { useSelector } from 'react-redux'

import { selectDeckColor } from '@account/slice/accountSlice'
import '@components/card/Card.scss'

const CardBack = () => {
  const deckColor = useSelector(selectDeckColor)

  return (
    <div className="card" style={{ padding: '.17rem' }}>
      <div className="card-back" style={{ backgroundColor: deckColor }} />
    </div>
  )
}

export default CardBack
