import { Fragment } from 'react';
import { useFormikContext } from 'formik';

import { infoText } from 'common/text-constants';
import Radio from 'components/ui/Radio';

const Dilemma = ({ name, options }) => {
  const { values } = useFormikContext();

  return (
    <>
      {options.map(option => (
        <Fragment key={option}>
          <Radio
            name={name}
            label={option}
            value={option}
            checked={values[name] === option}
            info={infoText[option]}
          />
        </Fragment>
      ))}
    </>
  );
};

export default Dilemma;
