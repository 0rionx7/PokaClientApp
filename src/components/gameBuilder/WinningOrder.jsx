import { memo } from 'react';

import { useGameBuilderContext } from 'hooks/gameBuilderContext';
import { winningOrders } from 'utils/text-constants';
import Radio from 'components/ui/Radio';

const orders = Object.values(winningOrders);

const WinningOrder = memo(() => {
  const { values } = useGameBuilderContext();

  return (
    <>
      {orders.map(order => (
        <Radio
          key={values.winningOrder + order}
          name="winningOrder"
          label={order}
          value={order}
          defaultChecked={values.winningOrder === order}
        />
      ))}
    </>
  );
});

export default WinningOrder;
