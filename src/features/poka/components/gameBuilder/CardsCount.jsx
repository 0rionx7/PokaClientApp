import { useGameBuilderContext } from 'poka/components/gameBuilder/useGameBuilderContext';
import Radio from 'ui/Radio';
import { gameNames } from 'poka/utils/games';

const CardsCount = ({ name }) => {
  const { values, setFieldValue } = useGameBuilderContext();

  let countOptions = [2, 3, 4, 5];
  if (name === 'cornerLength') countOptions = [2, 3, 4];
  if (name === 'railroadLength') countOptions = [2, 3, 4, 5, 6, 7];
  if (values.gameName === gameNames.POKER) countOptions = [5, 6, 7];

  function handleChange(e) {
    setFieldValue([name], e.target.value);
  }

  return (
    <>
      {countOptions.map(count => (
        <Radio
          key={values.gameName + count}
          name={name}
          value={count}
          checked={+values[name] === count}
          onChange={handleChange}
        />
      ))}
    </>
  );
};

export default CardsCount;
