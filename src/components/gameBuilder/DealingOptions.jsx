import { useGameBuilderContext } from 'hooks/gameBuilderContext';
import { dealingType, infoText } from 'utils/text-constants';
import NumericInput from 'components/ui/NumericInput';
import CheckBox from 'components/ui/CheckBox';

const DealingOptions = () => {
  const { values, setValues } = useGameBuilderContext();

  const handleDenyChange = e => {
    if (e.target.checked)
      setValues(prev => ({ ...prev, dealing: dealingType.ENA_ENA }));
    setValues(prev => ({ ...prev, deny: e.target.checked }));
  };
  return (
    <>
      <CheckBox
        label="ΜΕ ΣΚΑΡΤΟ"
        checked={values.skarto}
        onChange={e => setValues({ ...values, skarto: e.target.checked })}
        info={infoText.SKARTO}
      />
      <div className="with-counter">
        <CheckBox
          label="ΜΕ ΑΡΝΗΣΗ"
          checked={values.deny}
          onChange={handleDenyChange}
          className={values.deny && 'active-title'}
          info={infoText.ARNISI}
        />
        {values.deny && (
          <NumericInput
            name="denies"
            className={values.deny && 'active-counter'}
          />
        )}
      </div>
      <div className="with-counter">
        <CheckBox
          label="ΜΕ ΑΛΛΑΓΗ"
          checked={values.swap}
          onChange={e => setValues({ ...values, swap: e.target.checked })}
          className={values.swap && 'active-title'}
          info={infoText.ALAGI}
        />
        {values.swap && (
          <NumericInput
            name="swaps"
            className={values.swap && 'active-counter'}
          />
        )}
      </div>
    </>
  );
};

export default DealingOptions;
