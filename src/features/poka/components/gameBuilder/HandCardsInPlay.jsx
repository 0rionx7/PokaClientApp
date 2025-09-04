import CheckBox from '@ui/CheckBox';
import { useGameBuilderContext } from '@poka/components/gameBuilder/useGameBuilderContext';

const HandCardsInPlay = () => {
  const { values, setFieldValue } = useGameBuilderContext();
  const inPlay = [1, 2, 3, 4, 5, 6, 7].slice(0, +values.cardsInHand);
  const style = { alignSelf: 'flex-end', fontSize: '.8rem' };

  const handleChange = (e) => {
    const { value, checked } = e.target;
    if (
      values.handCardsInPlay.length === 1 &&
      e.target.value === values.handCardsInPlay[0]
    )
      return;
    const handCardsInPlay = checked
      ? [...values.handCardsInPlay, value]
      : values.handCardsInPlay.filter((v) => v !== value);
    setFieldValue('handCardsInPlay', handCardsInPlay);
  };

  return (
    <>
      {inPlay.map((count) => (
        <CheckBox
          key={count}
          style={style}
          name="handCardsInPlay"
          value={count}
          checked={values.handCardsInPlay.includes(count.toString())}
          onChange={handleChange}
        />
      ))}
    </>
  );
};

export default HandCardsInPlay;
