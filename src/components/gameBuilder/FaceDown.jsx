import { memo } from 'react';

import { useGameBuilderContext } from 'hooks/gameBuilderContext';
import CheckBox from 'components/ui/CheckBox';

const label = ['1o', '2o', '3o', '4o', '5o', '6ο', '7ο'];

const FaceDown = memo(() => {
  const { values } = useGameBuilderContext();
  const currentLabels = label.slice(0, +values.cardsInHand);

  return (
    <>
      {currentLabels.map((label, i) => (
        <CheckBox
          key={label}
          name="faceDownIndexes"
          label={label}
          value={i}
          defaultChecked={values.faceDownIndexes.includes(i.toString())}
        />
      ))}
    </>
  );
});

export default FaceDown;
