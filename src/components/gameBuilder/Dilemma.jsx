import { useGameBuilderContext } from 'hooks/gameBuilderContext';
import { infoText } from 'utils/text-constants';
import Radio from 'components/ui/Radio';

const Dilemma = ({ name, options }) => {
  const { values } = useGameBuilderContext();

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
            info={infoText[optionName]}
          />
        );
      })}
    </>
  );
};

export default Dilemma;
