import { useEffect, useState, useEffectEvent } from 'react'
import { useSelector } from 'react-redux'

import {
  useGetChineseStateQuery,
  useNextRoundChineseMutation,
  useSubmitCardsChineseMutation
} from '@chinese/api/chineseApi'
import { selectBoardCards, selectHandcards } from '@chinese/slice/chineseStateSlice'
import { selectUserName } from '@account/api/accountApi'
import { isSitting } from '@utils/helper-functions'
import FantasyButtons from '@chinese/components/table/FantasyButtons'
import HandCards from '@chinese/components/table/HandCards'
import Button from '@ui/Button'
import classes from './Table.module.scss'

const Hand = () => {
  const handCards = useSelector(selectHandcards)
  const boardCards = useSelector(selectBoardCards)
  const username = useSelector(selectUserName)
  const { data } = useGetChineseStateQuery()
  const [submit] = useSubmitCardsChineseMutation()
  const [nextRound] = useNextRoundChineseMutation()
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [hasNexted, setHasNexted] = useState(false)
  const resetActions = useEffectEvent(() => {
    setHasNexted(false)
    setHasSubmitted(false)
  })

  useEffect(() => resetActions(), [handCards])

  const { nextPlayers, playerStates } = data
  const [currentPlayer] = nextPlayers

  const hasTurn = username === currentPlayer
  const cardsLeftInHand = handCards?.filter(Boolean)?.length
  const legitSubmit = handCards?.length === 5 ? cardsLeftInHand === 0 : cardsLeftInHand === 1
  const canSubmit = !hasSubmitted && hasTurn && legitSubmit
  const sittedCount = playerStates.filter(isSitting).length
  const canNext =
    sittedCount > 1 &&
    nextPlayers.length <= sittedCount &&
    nextPlayers.includes(username) &&
    !hasNexted
  const shift = playerStates.length === 2 ? '-50%' : '50%'
  const left = `calc(-.5 * (var(--card-width) + .3rem) * ${handCards?.length} + ${shift})`

  const submitCards = async () => {
    if (canSubmit) {
      setHasSubmitted(true)
      await submit({ boardCards })
    }
    if (canNext) {
      setHasNexted(true)
      await nextRound()
    }
  }

  return (
    <div className={classes.hand} style={{ left }}>
      <Button
        onClick={submitCards}
        disabled={!canSubmit && !canNext}
        prompt={canNext ? 'Επόμενος γύρος' : 'Υποβολή'}
        style={{ padding: '.8rem 2rem' }}
      />
      <FantasyButtons />
      <HandCards />
    </div>
  )
}

export default Hand
