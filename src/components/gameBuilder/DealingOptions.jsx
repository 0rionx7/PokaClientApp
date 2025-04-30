import { useEffect } from 'react';
import { useFormikContext } from 'formik';

import { dealingOrders, infoText } from 'utils/text-constants';
import CheckBox from 'components/ui/CheckBox';
import NumericInput from 'components/ui/NumericInput';

const DealingOptions = () => {
  const { values, setFieldValue } = useFormikContext();

  useEffect(() => {
    if (values.deny) setFieldValue('dealing', dealingOrders.ENA_ENA);
  }, [values.deny, setFieldValue]);

  useEffect(() => {
    if (values.dealing === dealingOrders.OLA_MAZI) setFieldValue('deny', false);
  }, [values.dealing, setFieldValue]);

  return (
    <>
      <CheckBox
        name="skarto"
        label="ΜΕ ΣΚΑΡΤΟ"
        checked={values.skarto}
        info={infoText.SKARTO}
      />
      <div className="with-counter">
        <CheckBox
          name="deny"
          label="ΜΕ ΑΡΝΗΣΗ"
          checked={values.deny}
          className={values.deny && 'active-title'}
          info={infoText.ARNISI}
        />
        {values.deny && (
          <NumericInput
            name="denies"
            startingNumber={1}
            className={values.deny && 'active-counter'}
          />
        )}
      </div>
      <div className="with-counter">
        <CheckBox
          name="swap"
          label="ΜΕ ΑΛΛΑΓΗ"
          checked={values.swap}
          className={values.swap && 'active-title'}
          info={infoText.ALAGI}
        />
        {values.swap && (
          <NumericInput
            name="swaps"
            startingNumber={1}
            className={values.swap && 'active-counter'}
          />
        )}
      </div>
    </>
  );
};

export default DealingOptions;
