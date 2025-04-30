import { memo } from 'react';

import { extraBuilderValues } from 'utils/text-functions';
import CheckBox from 'components/ui/CheckBox';

const Extra = memo(({ gameName }) => {
  const { name, label } = extraBuilderValues(gameName);

  return (
    <CheckBox
      name={name}
      label={label}
      style={{ flexDirection: 'row-reverse' }}
    />
  );
});

export default Extra;
