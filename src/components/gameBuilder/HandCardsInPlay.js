import { useFormikContext } from 'formik';
import { Fragment } from 'react';
import CheckBox from 'src/components/ui/CheckBox';

const HandCardsInPlay = () => {
  const { values } = useFormikContext();

  const inPlay = [1, 2, 3, 4, 5, 6, 7].slice(0, +values.cardsInHand);

  return (
    <>
      {inPlay.map(count => (
        <Fragment key={count}>
          <CheckBox
            name="handCardsInPlay"
            value={count}
            checked={values.handCardsInPlay.includes(count.toString())}
          />
        </Fragment>
      ))}
    </>
  );
};

export default HandCardsInPlay;
