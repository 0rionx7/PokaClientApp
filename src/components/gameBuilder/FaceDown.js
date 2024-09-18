import { Fragment, memo } from 'react';

import CheckBox from 'components/ui/CheckBox';

const label = ['1o', '2o', '3o', '4o', '5o', '6ο', '7ο'];

const FaceDown = memo(({ cardsInHand, faceDownIndexes }) => {
  const currentLabels = label.slice(0, +cardsInHand);

  return (
    <>
      {currentLabels.map((label, i) => (
        <Fragment key={label}>
          <CheckBox
            name="faceDownIndexes"
            label={label}
            value={i}
            checked={faceDownIndexes.includes(i.toString())}
          />
        </Fragment>
      ))}
    </>
  );
});

export default FaceDown;
