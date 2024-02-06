import { useFormikContext } from 'formik';

import { extraBuilderValues } from 'utils/text-functions';
import CheckBox from 'components/ui/CheckBox';

const Extra = () => {
  const { values } = useFormikContext();
  const { name, label } = extraBuilderValues(values.gameName);

  return (
    <CheckBox
      name={name}
      label={label}
      style={{ flexDirection: 'row-reverse' }}
    />
  );
};

export default Extra;
