import { useGetPokaStateQuery } from '@poka/api/pokaApi'

const PlayHandCards = () => {
  const { data } = useGetPokaStateQuery()

  const { cardsInHand, skarto, handCardsInPlay } = data
  const cardsInPlay = handCardsInPlay?.slice().sort()

  const extraHandCards = [cardsInPlay.join(' ή ')]

  return (
    <div>
      <span>{cardsInHand}</span> {'χαρτιά στο χέρι '}
      {skarto && <span> συν ΈΝΑ ΣΚΑΡΤΟ,</span>} {`"παίζουν" `}
      <span>{extraHandCards}</span>
    </div>
  )
}

export default PlayHandCards
