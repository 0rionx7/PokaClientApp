import { useParams } from 'react-router-dom';
import { useFormikContext } from 'formik';

import { useGetGameStateQuery } from 'features/gameState/gameStateApi';
import BetOptionButton from 'components/action/BetOptionButton';

const BetOptions = ({ disabled }) => {
  const { gameId } = useParams();
  const {
    data: { chip },
  } = useGetGameStateQuery(gameId);
  const { values, setFieldValue, isSubmitting, errors } = useFormikContext();

  const betAmounts = [chip, 5 * chip, 25 * chip, 100 * chip];
  const colors = ['green', 'black', 'yellow', 'red'];

  return (
    <>
      {betAmounts.map((amount, i) => (
        <BetOptionButton
          key={amount}
          amount={amount}
          color={colors[i]}
          onClick={() =>
            setFieldValue(
              'amount',
              values.amount ? values.amount + amount : amount
            )
          }
          disabled={isSubmitting || disabled || errors.amount}
          style={{ gridArea: 'b-' + amount / chip }}
          className="bet-option orange"
        />
      ))}
    </>
  );
};

export default BetOptions;
