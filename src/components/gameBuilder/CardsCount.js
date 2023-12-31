import { Fragment } from 'react';
import { useFormikContext } from 'formik';

import Radio from 'components/ui/Radio';
import { gameNames } from 'common/games';

const CardsCount = ({ name }) => {
  const { values } = useFormikContext();

  let countOptions = [2, 3, 4, 5];
  if (name === 'cornerLength') countOptions = [2, 3, 4];
  if (name === 'railroadLength') countOptions = [2, 3, 4, 5, 6, 7];
  if (values.gameName === gameNames.POKER) countOptions = [5, 6, 7];
  if (values.gameName === gameNames.QUEEN) countOptions = [5, 6];

  return (
    <>
      {countOptions.map(count => (
        <Fragment key={count}>
          <Radio
            name={name}
            value={count}
            checked={+values[name] === count}
            className="checkbox"
          />
        </Fragment>
      ))}
    </>
  );
};

export default CardsCount;
