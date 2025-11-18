import { useEffect, useState } from 'react'

import { useBetMutation, useGetPokaStateQuery } from '@poka/api/pokaApi'
import BetOptions from '@poka/components/action/BetOptions'
import { formatNumber } from '@utils/helper-functions'
import { betPrompt } from '@utils/text-functions'
import Button from '@ui/Button'
import './Bet.scss'

const Bet = ({ bet, resta }) => {
  const [placeBet, { reset, isSuccess }] = useBetMutation()
  const {
    data: { maxBet, chip, nextPlayers }
  } = useGetPokaStateQuery()
  const minBet = Math.min(maxBet, resta) - bet
  const [betAmount, setBetAmount] = useState(minBet)
  const [status, setStatus] = useState({})

  useEffect(() => {
    return () => reset()
  }, [reset, nextPlayers])

  const validate = (amount) => {
    if (amount < minBet && amount >= 0) return setStatus({ error: `ελάχ. : ${minBet}` })
    if (amount > 0 && amount < chip) return setStatus({ error: `ελάχ. : ${chip}` })
    if (amount + bet > resta) return setStatus({ error: 'ΑΝΕΠΑΡΚΕΣ ΥΠΟΛΟΙΠΟ' })
    setStatus({})
  }

  async function betSubmit(e) {
    e.preventDefault()
    setStatus({ pending: true })
    const folded = e.nativeEvent.submitter.value === 'ΠΑΣΟ'
    const roundedAmount = Math.floor(betAmount / chip) * chip
    const amount = folded ? -1 : roundedAmount
    const result = await placeBet({ amount })
    if (result.error?.data) return setStatus({ error: result.error?.data })
    setStatus({})
  }

  return (
    <form className="bet" onSubmit={betSubmit}>
      <div className="form-control">
        <label htmlFor="amount">ΠΟΝΤΑΡΙΣΜΑ</label>
        <input
          id="amount"
          name="amount"
          type="text"
          inputMode="numeric"
          disabled={isSuccess || status.pending}
          value={+betAmount}
          onChange={(e) => {
            validate(+e.target.value)
            setBetAmount(+e.target.value)
          }}
        />
        {status.error ? (
          <span style={{ color: 'red' }}>{status.error}</span>
        ) : (
          <span>ή πληκ/στε</span>
        )}
      </div>
      <div className="place-bet">
        <div>ΠΟΝΤΑΡΕΤΕ</div>
        <Button
          prompt={betPrompt(Math.floor(betAmount / chip) * chip, minBet, resta, status.error)}
          disabled={status.error || status.pending || isSuccess}
          className="green"
        />
      </div>
      <div className="place-bet fold">
        <div>ΑΠΟΣΥΡΘΗΤΕ</div>
        <Button
          prompt="ΠΑΣΟ"
          value="ΠΑΣΟ"
          disabled={isSuccess || status.pending}
          className="fold red"
        />
      </div>
      <BetOptions
        betAmount={betAmount}
        setBetAmount={setBetAmount}
        validate={validate}
        disabled={isSuccess || status.pending}
      />
      <div className="call">
        {maxBet <= resta && (
          <Button
            onClick={() => {
              setStatus({})
              setBetAmount(minBet)
            }}
            prompt={formatNumber(minBet)}
            className="call-btn green"
            type="button"
            disabled={isSuccess || status.pending}
          />
        )}
        <Button
          onClick={() => {
            setStatus({})
            setBetAmount(resta - bet)
          }}
          prompt="ΡΕΣΤΑ"
          className="call-btn purple"
          type="button"
          disabled={isSuccess || status.pending}
        />
      </div>
    </form>
  )
}

export default Bet
