import { useState } from 'react';

import { useGameBuilderContext } from '@poka/components/gameBuilder/useGameBuilderContext';
import { DEALINGKIND, INFOTEXT } from '@utils/text-constants';
import NumericInput from '@ui/NumericInput';
import CheckBox from '@ui/CheckBox';

const DealingOptions = ({ deny, setDeny }) => {
  const { values, setFieldValue } = useGameBuilderContext();
  const [swap, setSwap] = useState(false);

  const handleDenyChange = e => {
    if (e.target.checked) setFieldValue('dealing', DEALINGKIND.ENA_ENA);
    setFieldValue('denials', e.target.checked ? 1 : 0);
    setDeny(e.target.checked);
  };

  const handleSwapChange = e => {
    setFieldValue('swaps', e.target.checked ? 1 : 0);
    setSwap(e.target.checked);
  };

  return (
    <>
      <CheckBox
        label="ΜΕ ΣΚΑΡΤΟ"
        checked={values.skarto}
        onChange={e => setFieldValue('skarto', e.target.checked)}
        info={INFOTEXT.SKARTO}
      />
      <div className="with-counter">
        <CheckBox
          label="ΜΕ ΑΡΝΗΣΗ"
          checked={deny}
          onChange={handleDenyChange}
          className={deny && 'active-title'}
          info={INFOTEXT.ARNISI}
        />
        {deny && (
          <NumericInput name="denials" className={deny && 'active-counter'} />
        )}
      </div>
      <div className="with-counter">
        <CheckBox
          label="ΜΕ ΑΛΛΑΓΗ"
          checked={swap}
          onChange={handleSwapChange}
          className={swap && 'active-title'}
          info={INFOTEXT.ALAGI}
        />
        {swap && (
          <NumericInput name="swaps" className={swap && 'active-counter'} />
        )}
      </div>
    </>
  );
};

export default DealingOptions;
