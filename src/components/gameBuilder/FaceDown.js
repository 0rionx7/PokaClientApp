import { Fragment } from 'react';
import { useFormikContext } from 'formik';

import CheckBox from 'src/components/ui/CheckBox';

const label = ['1o', '2o', '3o', '4o', '5o', '6ο', '7ο'];

const FaceDown = () => {
  const { values } = useFormikContext();

  const currentLabels = label.slice(0, +values.cardsInHand);

  return (
    <>
      {currentLabels.map((label, i) => (
        <Fragment key={label}>
          <CheckBox
            name="faceDownIndexes"
            label={label}
            value={i}
            checked={values.faceDownIndexes.includes(i.toString())}
          />
        </Fragment>
      ))}
    </>
  );
};

export default FaceDown;
