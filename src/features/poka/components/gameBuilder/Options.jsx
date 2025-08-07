import { useState } from 'react';

import { useGameBuilderContext } from 'poka/components/gameBuilder/useGameBuilderContext';
import { infoText } from 'utils/text-constants';
import CheckBox from 'ui/CheckBox';
import Radio from 'ui/Radio';

const Options = () => {
  const { values, setFieldValue } = useGameBuilderContext();
  const [hat, setHat] = useState(false);

  const handleHatChange = e => {
    setHat(e.target.checked);
    setFieldValue('hats', e.target.checked ? 1 : 0);
    if (!e.target.checked) setFieldValue('obligation', false);
  };

  return (
    <>
      <CheckBox
        label='ΑΝΟΙΓΜΑ "ΜΠΟΜΠΑ"'
        name="bomba"
        checked={values.bomba}
        onChange={e => setFieldValue('bomba', e.target.checked)}
        info={infoText.BOMBA}
      />
      <CheckBox
        label="ΜΕ ΚΑΠΕΛΟ"
        name="hat"
        checked={hat}
        onChange={handleHatChange}
      />
      {hat && (
        <>
          {['ΜΟΝΟ', 'ΔΙΠΛΟ', 'ΤΡΙΠΛΟ'].map((label, i) => (
            <Radio
              key={label}
              name="hats"
              label={label}
              value={i + 1}
              checked={values.hats === i + 1}
              onChange={e => setFieldValue('hats', i + 1)}
              info={infoText.HAT}
            />
          ))}
          <CheckBox
            name="obligation"
            label="ΥΠΟΧΡΕΩΣΗ"
            checked={values.obligation}
            onChange={e => setFieldValue('obligation', e.target.checked)}
          />
        </>
      )}
    </>
  );
};

export default Options;
