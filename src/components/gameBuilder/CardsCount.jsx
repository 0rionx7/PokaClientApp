import { useGameBuilderContext } from 'hooks/useGameBuilderContext';
import Radio from 'components/ui/Radio';
import { gameNames } from 'utils/games';

const CardsCount = ({ name }) => {
  const { values, setValues } = useGameBuilderContext();

  let countOptions = [2, 3, 4, 5];
  if (name === 'cornerLength') countOptions = [2, 3, 4];
  if (name === 'railroadLength') countOptions = [2, 3, 4, 5, 6, 7];
  if (values.gameName === gameNames.POKER) countOptions = [5, 6, 7];

  function handleChange(e) {
    setValues(prev => ({ ...prev, [name]: e.target.value }));
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
