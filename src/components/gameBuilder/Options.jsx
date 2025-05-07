import { memo } from 'react';

import { useGameBuilderContext } from 'hooks/gameBuilderContext';
import { infoText } from 'utils/text-constants';
import CheckBox from 'components/ui/CheckBox';
import Radio from 'components/ui/Radio';

const Options = memo(() => {
  const { values, setValues } = useGameBuilderContext();

  return (
    <>
      <CheckBox
        label='ΑΝΟΙΓΜΑ "ΜΠΟΜΠΑ"'
        info={infoText.BOMBA}
        name="bomba"
        defaultChecked={false}
      />
      <CheckBox
        label="ΜΕ ΚΑΠΕΛΟ"
        name="hat"
        defaultChecked={false}
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
              defaultChecked={i === 0}
            />
          ))}
          <CheckBox name="obligation" label="ΥΠΟΧΡΕΩΣΗ" />
        </>
      )}
    </>
  );
});

export default Options;
