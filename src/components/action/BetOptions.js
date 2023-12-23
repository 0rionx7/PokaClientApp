import { useParams } from 'react-router-dom';
import { useFormikContext } from 'formik';

import {
  useBetMutation,
  useGetGameStateQuery,
} from 'features/gameState/gameStateApi';
import Button from 'components/ui/Button';

const BetOptions = () => {
  const { gameId } = useParams();
  const {
    data: { chip },
  } = useGetGameStateQuery(gameId);
  const { values, setFieldValue, isSubmitting, errors } = useFormikContext();
  const [, { isSuccess }] = useBetMutation();

  const betAmounts = [chip, 5 * chip, 25 * chip, 100 * chip];

  return (
    <>
      {betAmounts.map((amount, i) => {
        const color =
          i === 0 ? 'green' : i === 1 ? 'black' : i === 2 ? 'yellow' : 'red';
        const displayValue = amount >= 1000 ? amount / 1000 + 'K' : amount;
        const prompt = (
          <div className="bet-options">
            {'+ ' + displayValue.toLocaleString()}
            <img src={require(`assets/chips/${color}.png`)} alt="chip" />
          </div>
        );

        return (
          <Button
            key={amount}
            prompt={prompt}
            onClick={() =>
              setFieldValue(
                'amount',
                values.amount ? values.amount + amount : amount
              )
            }
            disabled={isSubmitting || isSuccess || errors.amount}
            style={{ gridArea: 'b-' + amount / chip }}
            className="bet-amount orange"
          />
        );
      })}
    </>
  );
};

export default BetOptions;
