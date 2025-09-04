import { useGameBuilderContext } from '@poka/components/gameBuilder/useGameBuilderContext';
import { DEALING_KIND, INFO_TEXT } from '@utils/text-constants';
import Radio from '@ui/Radio';

const Dilemma = ({ name, options, setDeny }) => {
  const { values, setFieldValue } = useGameBuilderContext();

  function handleChange(e) {
    if (name === 'dealing' && e.target.value === DEALING_KIND.OLA_MAZI) {
      setDeny(false);
      setFieldValue('denials', 0);
    }
    setFieldValue([name], e.target.value);
  }

  return (
    <>
      {options.map((option) => (
        <Radio
          key={option}
          name={name}
          label={option}
          value={option}
          checked={values[name] === option}
          onChange={handleChange}
          info={INFO_TEXT[option]}
        />
      ))}
    </>
  );
};

export default Dilemma;
