import { useGameBuilderContext } from 'hooks/useGameBuilderContext';
import { infoText } from 'utils/text-constants';
import CheckBox from 'components/ui/CheckBox';
import Radio from 'components/ui/Radio';

const Options = () => {
  const { values, setValues } = useGameBuilderContext();

  return (
    <>
      <CheckBox
        label='ΑΝΟΙΓΜΑ "ΜΠΟΜΠΑ"'
        info={infoText.BOMBA}
        name="bomba"
        checked={values.bomba}
        onChange={e =>
          setValues(values => ({ ...values, bomba: e.target.checked }))
        }
      />
      <CheckBox
        label="ΜΕ ΚΑΠΕΛΟ"
        name="hat"
        checked={values.hat}
        onChange={e =>
          setValues(values => ({ ...values, hat: e.target.checked }))
        }
      />
      {values.hat && (
        <>
          {['ΜΟΝΟ', 'ΔΙΠΛΟ', 'ΤΡΙΠΛΟ'].map((label, i) => (
            <Radio
              key={label}
              name="hats"
              label={label}
              value={i + 1}
              info={infoText.HAT}
              checked={+values.hats === i + 1}
              onChange={e => setValues(values => ({ ...values, hats: i + 1 }))}
            />
          ))}
          <CheckBox
            name="obligation"
            label="ΥΠΟΧΡΕΩΣΗ"
            checked={values.obligation}
            onChange={e =>
              setValues(values => ({ ...values, obligation: e.target.checked }))
            }
          />
        </>
      )}
    </>
  );
};

export default Options;
