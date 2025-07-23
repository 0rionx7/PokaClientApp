import { useGameBuilderContext } from 'hooks/gameBuilderContext';
import { dealingType, infoText } from 'utils/text-constants';
import Radio from 'components/ui/Radio';

const Dilemma = ({ name, options }) => {
  const { values, setValues } = useGameBuilderContext();

  function handleChange(e) {
    if (name === 'dealing' && values.dealing === dealingType.ENA_ENA)
      setValues(prev => ({ ...prev, deny: false }));
    setValues(prev => ({ ...prev, [name]: e.target.value }));
  }

  return (
    <>
      {options.map(option => {
        const optionName = option.name ?? option;
        const label = option.img ?? option;

        return (
          <Radio
            key={values[name] + optionName}
            name={name}
            label={label}
            value={optionName}
            defaultChecked={values[name] === optionName}
            onChange={handleChange}
            info={infoText[optionName]}
          />
        );
      })}
    </>
  );
};

export default Dilemma;
