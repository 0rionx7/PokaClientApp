import { Fragment, memo } from 'react';
import Radio from 'components/ui/Radio';
import { winningOrders } from 'utils/text-constants';

const WinningOrder = memo(({ winningOrder }) => {
  const orders = Object.values(winningOrders);

  return (
    <>
      {orders.map(order => (
        <Fragment key={order}>
          <Radio
            name="winningOrder"
            label={order}
            value={order}
            checked={winningOrder === order}
          />
        </Fragment>
      ))}
    </>
  );
});

export default WinningOrder;
