import { memo } from 'react';

import CheckBox from 'components/ui/CheckBox';
import { useGameBuilderContext } from 'hooks/useGameBuilderContext';

const HandCardsInPlay = memo(() => {
  const { values } = useGameBuilderContext();
  const inPlay = [1, 2, 3, 4, 5, 6, 7].slice(0, +values.cardsInHand);
  const style = { alignSelf: 'flex-end', fontSize: '.8rem' };

  return (
    <>
      {inPlay.map(count => (
        <CheckBox
          key={count}
          style={style}
          name="handCardsInPlay"
          value={count}
          defaultChecked={values.handCardsInPlay.includes(count.toString())}
        />
      ))}
    </>
  );
});

export default HandCardsInPlay;
