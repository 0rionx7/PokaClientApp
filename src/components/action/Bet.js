import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';

import { useBetMutation } from 'features/gameApi/gameStateMutations/useBetMutation';
import { useGetGameStateQuery } from 'features/gameApi/gameApi';
import { betPrompt } from 'common/text-functions';
import Button from 'components/ui/Button';
import './Bet.scss';

const Bet = ({ bet, resta }) => {
  const { gameId } = useParams();
  const { maxBet, chip, currentPlayerStateList } = useGetGameStateQuery(
    gameId,
    {
      selectFromResult: ({ data }) => ({
        maxBet: data?.maxBet,
        chip: data?.chip,
        currentPlayerStateList: data?.currentPlayerStateList,
      }),
    }
  );
  const [placeBet, { reset, isSuccess }] = useBetMutation();

  const minBet = Math.min(maxBet, resta) - bet;
  const betAmounts = [chip, 5 * chip, 25 * chip, 100 * chip];

  useEffect(() => {
    return () => reset();
  }, [reset, currentPlayerStateList]);

  const validate = values => {
    let errors = {};
    if (values.amount < minBet && values.amount >= 0)
      errors.amount = `ελάχ. ποντάρισμα ${minBet}`;
    if (values.amount + bet > resta) errors.amount = 'ΑΝΕΠΑΡΚΕΣ ΥΠΟΛΟΙΠΟ';
    return errors;
  };

  return (
    <Formik
      initialValues={{ amount: minBet }}
      onSubmit={async ({ amount }) => await placeBet(amount)}
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
              <span>ή πληκτρολογήστε</span>
            )}
          </div>
          <div className="place-bet">
            <div>ΠΟΝΤΑΡΕΤΕ</div>
            <Button
              prompt={betPrompt(values.amount, minBet, resta, errors.amount)}
              type="submit"
              disabled={isSubmitting || errors.amount || isSuccess}
              className="green"
            />
          </div>
          <div className="place-bet fold">
            <div>ΑΠΟΣΥΡΘΗΤΕ</div>
            <Button
              prompt="ΠΑΣΟ"
              onClick={() => placeBet(-1)}
              disabled={isSubmitting || isSuccess}
              className="fold red"
            />
          </div>
          {betAmounts.map(amount => (
            <Button
              key={amount}
              prompt={'+ ' + amount}
              onClick={() => setFieldValue('amount', values.amount + amount)}
              disabled={isSubmitting || isSuccess}
              style={{ gridArea: 'b-' + amount / chip }}
              className="bet-amount orange"
            />
          ))}
          <div className="call">
            {maxBet <= resta && (
              <Button
                onClick={() => setFieldValue('amount', minBet)}
                prompt={minBet === 0 ? 'Ντούκου' : `Μέσα στα\n ${minBet}`}
                disabled={isSubmitting || isSuccess}
                className="call-btn green"
              />
            )}
            <Button
              onClick={() => setFieldValue('amount', resta - bet)}
              prompt="ΡΕΣΤΑ"
              disabled={isSubmitting || isSuccess}
              className="all-in"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Bet;
