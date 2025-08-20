import { useGameBuilderContext } from '@poka/components/gameBuilder/useGameBuilderContext';
import { WINNING_ORDERS } from '@utils/text-constants';
import Radio from '@ui/Radio';

const winningOrders = Object.values(WINNING_ORDERS);

const WinningOrder = () => {
  const { values, setFieldValue } = useGameBuilderContext();

  return (
    <>
      {winningOrders.map(winningOrder => (
        <Radio
          key={winningOrder}
          name="winningOrder"
          label={winningOrder}
          value={winningOrder}
          checked={values.winningOrder === winningOrder}
          onChange={() => setFieldValue('winningOrder', winningOrder)}
        />
      ))}
    </>
  );
};

export default WinningOrder;
