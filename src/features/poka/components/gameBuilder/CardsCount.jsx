import { useGameBuilderContext } from '@poka/components/gameBuilder/useGameBuilderContext';
import { gameNames } from '@poka/utils/games';
import Radio from '@ui/Radio';

const countMap = {
  cardsInHand: [2, 3, 4, 5],
  cornerLength: [2, 3, 4],
  railroadLength: [2, 3, 4, 5, 6, 7],
  [gameNames.POKER]: [5, 6, 7],
};

const CardsCount = ({ name }) => {
  const { values, setFieldValue } = useGameBuilderContext();

  const countOptions = countMap[values.gameName] || countMap[name];

  function handleChange(e) {
    setFieldValue([name], e.target.value);
  }

  return (
    <>
      {countOptions.map((count) => (
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
