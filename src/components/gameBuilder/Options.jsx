import { memo, useEffect } from 'react';

import { infoText } from 'utils/text-constants';
import CheckBox from 'components/ui/CheckBox';
import Radio from 'components/ui/Radio';

const Options = memo(({ hat, hats, gameName, setFieldValue }) => {
  useEffect(() => {
    if (hat) setFieldValue('hats', 1);
  }, [hat, setFieldValue]);

  return (
    <>
      <CheckBox
        key={gameName + '-bomba'}
        name="bomba"
        label={`ΑΝΟΙΓΜΑ "ΜΠΟΜΠΑ"`}
        info={infoText.BOMBA}
      />
      <CheckBox key={gameName + '-hat'} name="hat" label="ΜΕ ΚΑΠΕΛΟ" />
      {hat && (
        <>
          {['ΜΟΝΟ', 'ΔΙΠΛΟ', 'ΤΡΙΠΛΟ'].map((label, i) => (
            <Radio
              key={i}
              name="hats"
              label={label}
              value={i + 1}
              checked={+hats === i + 1}
              info={infoText.HAT}
            />
          ))}
          <CheckBox name="obligation" label="ΥΠΟΧΡΕΩΣΗ" />
        </>
      )}
    </>
  );
});

export default Options;
