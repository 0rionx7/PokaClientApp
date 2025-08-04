import { useGameBuilderContext } from 'components/gameBuilder/useGameBuilderContext';
import { dealingType, infoText } from 'utils/text-constants';
import Radio from 'components/ui/Radio';

const Dilemma = ({ name, options, setDeny }) => {
  const { values, setFieldValue } = useGameBuilderContext();

  function handleChange(e) {
    if (name === 'dealing' && e.target.value === dealingType.OLA_MAZI) {
      setDeny(false);
      setFieldValue('denies', 0);
    }
    setFieldValue([name], e.target.value);
  }

  return (
    <>
      {options.map(option => (
        <Radio
          key={option}
          name={name}
          label={option}
          value={option}
          checked={values[name] === option}
          onChange={handleChange}
          info={infoText[option]}
        />
      ))}
    </>
  );
};

export default Dilemma;
