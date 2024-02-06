import { useFormikContext } from 'formik';
import { Fragment } from 'react';
import Radio from 'components/ui/Radio';
import { winningOrders } from 'utils/text-constants';

const WinningOrder = () => {
  const { values } = useFormikContext();

  const orders = Object.values(winningOrders);

  return (
    <>
      {orders.map(order => (
        <Fragment key={order}>
          <Radio
            name="winningOrder"
            label={order}
            value={order}
            checked={values.winningOrder === order}
          />
        </Fragment>
      ))}
    </>
  );
};

export default WinningOrder;
