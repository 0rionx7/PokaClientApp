import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';

import {
  useBetMutation,
  useGetGameStateQuery,
} from 'features/gameState/gameStateApi';
import BetOptions from 'components/action/BetOptions';
import { betPrompt } from 'lib/text-functions';
import Button from 'components/ui/Button';
import './Bet.scss';

const Bet = ({ bet, resta }) => {
  const { gameId } = useParams();
  const [placeBet, { reset, isSuccess }] = useBetMutation();
  const {
    data: { maxBet, chip, currentPlayerList },
  } = useGetGameStateQuery(gameId);

  const minBet = Math.min(maxBet, resta) - bet;

  useEffect(() => {
    return () => reset();
  }, [reset, currentPlayerList]);

  const validate = values => {
    let errors = {};
    if (values.amount < minBet && values.amount >= 0)
      errors.amount = `ελάχ. : ${minBet}`;
    else if (values.amount > 0 && values.amount < chip)
      errors.amount = `ελάχ. : ${chip}`;
    if (values.amount + bet > resta) errors.amount = 'ΑΝΕΠΑΡΚΕΣ ΥΠΟΛΟΙΠΟ';
    return errors;
  };

  return (
    <Formik
      initialValues={{ amount: minBet }}
      onSubmit={async ({ amount }) => {
        const chipedAmount = Math.floor(amount / chip) * chip;
        await placeBet({ gameId, amount: chipedAmount });
      }}
      validate={validate}
      enableReinitialize // for Reinitialize  initial values!!!
    >
      {({ errors, values, setFieldValue, isSubmitting }) => (
        <Form className="bet">
          <div className="form-control">
            <label htmlFor="amount">ΠΟΝΤΑΡΙΣΜΑ</label>
            <Field id="amount" name="amount" type="number" />
            {errors.amount ? (
              <span style={{ color: 'red' }}>{errors.amount}</span>
            ) : (
              <span>ή πληκ/στε</span>
            )}
          </div>
          <div className="place-bet">
            <div>ΠΟΝΤΑΡΕΤΕ</div>
            <Button
              prompt={betPrompt(
                Math.floor(values.amount / chip) * chip,
                minBet,
                resta,
                errors.amount
              )}
              type="submit"
              disabled={isSubmitting || isSuccess || errors.amount}
              className="green"
            />
          </div>
          <div className="place-bet fold">
            <div>ΑΠΟΣΥΡΘΗΤΕ</div>
            <Button
              prompt="ΠΑΣΟ"
              onClick={() => placeBet({ gameId, amount: -1 })}
              disabled={isSubmitting || isSuccess}
              className="fold red"
            />
          </div>
          <BetOptions />
          <div className="call">
            {maxBet <= resta && (
              <Button
                onClick={() => setFieldValue('amount', minBet)}
                prompt={minBet.toLocaleString()}
                disabled={isSubmitting || isSuccess}
                className="call-btn green"
              />
            )}
            <Button
              onClick={() => setFieldValue('amount', resta - bet)}
              prompt="ΡΕΣΤΑ"
              disabled={isSubmitting || isSuccess}
              className="call-btn purple"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Bet;
