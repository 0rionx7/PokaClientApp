import { memo, useEffect } from 'react';

import { useGameBuilderContext } from '@poka/components/gameBuilder/useGameBuilderContext';
import CheckBox from '@ui/CheckBox';

const label = ['1o', '2o', '3o', '4o', '5o', '6ο', '7ο'];

const FaceDown = memo(() => {
  const { values, setFieldValue } = useGameBuilderContext();
  const currentLabels = label.slice(0, +values.cardsInHand);

  useEffect(() => {
    setFieldValue('faceDownIndexes', [...Array(+values.cardsInHand).keys()]);
  }, [setFieldValue, values.cardsInHand]);

  const handleChange = e => {
    const { value, checked } = e.target;
    if (
      values.faceDownIndexes.length === 1 &&
      +e.target.value === values.faceDownIndexes[0]
    )
      return;
    const faceDownIndexes = checked
      ? [...values.faceDownIndexes, +value]
      : values.faceDownIndexes.filter(v => v !== +value);
    setFieldValue('faceDownIndexes', faceDownIndexes);
  };

  return (
    <>
      {currentLabels.map((label, i) => (
        <CheckBox
          key={label}
          name="faceDownIndexes"
          label={label}
          value={i}
          checked={values.faceDownIndexes.includes(i)}
          onChange={handleChange}
        />
      ))}
    </>
  );
});

export default FaceDown;
