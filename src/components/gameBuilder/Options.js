import { useEffect } from 'react';
import { useFormikContext } from 'formik';

import { infoText } from 'common/text-constants';
import CheckBox from 'components/ui/CheckBox';
import Radio from 'components/ui/Radio';

const Options = () => {
  const { values, setFieldValue } = useFormikContext();

  useEffect(() => {
    if (values.hat) setFieldValue('hats', 1);
  }, [values.hat, setFieldValue]);

  return (
    <>
      <CheckBox
        key={values.gameName + '-bomba'}
        name="bomba"
        label={`ΑΝΟΙΓΜΑ "ΜΠΟΜΠΑ"`}
        info={infoText.BOMBA}
      />
      <CheckBox key={values.gameName + '-hat'} name="hat" label="ΜΕ ΚΑΠΕΛΟ" />
      {values.hat && (
        <>
          {['ΜΟΝΟ', 'ΔΙΠΛΟ', 'ΤΡΙΠΛΟ'].map((label, i) => (
            <Radio
              key={i}
              name="hats"
              label={label}
              value={i + 1}
              checked={+values.hats === i + 1}
              info={infoText.HAT}
            />
          ))}
          <CheckBox name="obligation" label="ΥΠΟΧΡΕΩΣΗ" />
        </>
      )}
    </>
  );
};

export default Options;
