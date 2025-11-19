import { useEffect, useState, useEffectEvent } from 'react'

import { useGetPokaStateQuery } from '@poka/api/pokaApi.js'
import { useRoomContext } from '@poka/components/RoomContext'
import { playerStateOf } from '@utils/helper-functions.js'
import { DEAL_DELAY } from '@poka/utils/games'

const useDelayedDeal = ({ playerState }) => {
  const { data } = useGetPokaStateQuery()
  const { setIsDealing } = useRoomContext()
  const [dealtCards, setDealtCards] = useState([])
  const [dealingIndex, setDealingIndex] = useState(0)
  const [firstDealt, setFirstDealt] = useState(false)
  const resetFirstDealt = useEffectEvent(() => setFirstDealt(false))
  const resetDealtCards = useEffectEvent((cards) => setDealtCards(cards))
  const resetDealingIndex = useEffectEvent(() => setDealingIndex(0))

  const { playerStates, dealer, nextPlayers } = data
  const { playerName, handCards, submittedHand } = playerState
  const [currentPlayer] = nextPlayers

  const handSubmitted = playerState.submittedHand.length
  const activePlayers = playerStates.filter((ps) => ps.isInGame)
  const turnOrder = activePlayers.findIndex(playerStateOf(playerName))
  const dealingCard = handCards.at(dealingIndex)
  const interval = activePlayers.length * DEAL_DELAY
  const playerDelay = (turnOrder + 1) * DEAL_DELAY

  const displayedCards = handSubmitted ? submittedHand : dealtCards
  const noDeal = dealingCard === undefined || playerDelay === 0 //second check for player leaving before deal ends

  useEffect(() => {
    if (noDeal || firstDealt) return
    setIsDealing(true)
    const timer = setTimeout(() => {
      setDealtCards((prev) => [...prev, dealingCard])
      setDealingIndex((prev) => prev + 1)
      setFirstDealt(true)
    }, playerDelay)

    return () => clearTimeout(timer)
  }, [dealingCard, playerDelay, firstDealt, setIsDealing, noDeal])

  useEffect(() => {
    if (noDeal || !firstDealt) return
    setIsDealing(true)
    const timer = setTimeout(() => {
      setDealtCards((prev) => [...prev, dealingCard])
      setDealingIndex((prev) => prev + 1)
    }, interval)

    return () => clearTimeout(timer)
  }, [dealingCard, firstDealt, interval, setIsDealing, noDeal])

  useEffect(() => resetFirstDealt(), [handCards])

  useEffect(() => {
    if (noDeal) {
      const timer = setTimeout(() => {
        setIsDealing(false)
      }, interval - playerDelay)

      return () => clearTimeout(timer)
    }
  }, [setIsDealing, interval, playerDelay, noDeal])
  // reseting on game end
  // for skarto , changed cards and show reveald cards
  useEffect(() => {
    if (handCards.length <= dealtCards.length) resetDealtCards(handCards)
  }, [dealtCards.length, handCards, currentPlayer?.handInfo?.kind])

  useEffect(() => {
    if (dealer) {
      resetFirstDealt([])
      resetDealingIndex()
    }
  }, [dealer])

  return displayedCards
}

export default useDelayedDeal
