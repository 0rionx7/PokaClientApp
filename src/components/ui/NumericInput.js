import { useEffect } from 'react';
import { Field, useFormikContext } from 'formik';

import './NumericInput.scss';

const NumericInput = ({ name, className, startingNumber }) => {
  const { values, setFieldValue, setFieldTouched } = useFormikContext();

  useEffect(() => {
    setFieldValue(name, startingNumber || 0);
    return () => setFieldValue(name, 0);
  }, [name, setFieldValue, setFieldTouched, startingNumber]);

  return (
    <div className={'container ' + className}>
      <button
        type="button"
        style={{ backgroundColor: 'green' }}
        onClick={() => {
          setFieldTouched(name, true);
          setFieldValue(name, values[name] + 1);
        }}>
        +
      </button>
      <div
        className="form-control"
        style={{ justifyContent: 'center', fontSize: '0.6rem' }}>
        <Field
          name={name}
          type="number"
          style={{ height: '100%', width: ' 2rem' }}
        />
        ΧΑΡΤΙ{values[name] !== 1 && 'Α'}
      </div>
      <button
        type="button"
        style={{ backgroundColor: '#d10000' }}
        onClick={() => {
          setFieldTouched(name, true);
          setFieldValue(name, values[name] - 1);
        }}>
        -
      </button>
    </div>
  );
};

export default NumericInput;
