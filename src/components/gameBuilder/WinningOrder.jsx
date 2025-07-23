import { memo } from 'react';

import { useGameBuilderContext } from 'hooks/useGameBuilderContext';
import { winningOrder } from 'utils/text-constants';
import Radio from 'components/ui/Radio';

const orders = Object.values(winningOrder);

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
