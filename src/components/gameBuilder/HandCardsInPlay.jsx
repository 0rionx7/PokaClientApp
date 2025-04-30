import { Fragment, memo } from 'react';

import CheckBox from 'components/ui/CheckBox';

const HandCardsInPlay = memo(({ cardsInHand, handCardsInPlay }) => {
  const inPlay = [1, 2, 3, 4, 5, 6, 7].slice(0, +cardsInHand);

  return (
    <>
      {inPlay.map(count => (
        <Fragment key={count}>
          <CheckBox
            name="handCardsInPlay"
            value={count}
            checked={handCardsInPlay.includes(count.toString())}
          />
        </Fragment>
      ))}
    </>
  );
});

export default HandCardsInPlay;
