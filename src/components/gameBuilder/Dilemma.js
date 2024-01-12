import { Fragment } from 'react';
import { useFormikContext } from 'formik';

import { infoText } from 'lib/text-constants';
import Radio from 'components/ui/Radio';

const Dilemma = ({ name, options }) => {
  const { values } = useFormikContext();

  return (
    <>
      {options.map(option => {
        const optionName = option.name ?? option;
        const label = option.img ?? option;
        return (
          <Fragment key={optionName}>
            <Radio
              name={name}
              label={label}
              value={optionName}
              checked={values[name] === optionName}
              info={infoText[optionName]}
            />
          </Fragment>
        );
      })}
    </>
  );
};

export default Dilemma;
