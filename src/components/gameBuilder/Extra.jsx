import { memo } from 'react';

import { useGameBuilderContext } from 'hooks/gameBuilderContext';
import { extraBuilderValues } from 'utils/text-functions';
import CheckBox from 'components/ui/CheckBox';

const Extra = memo(() => {
  const { values } = useGameBuilderContext();
  const { name, label } = extraBuilderValues(values.gameName);

  return (
    <CheckBox
      name={name}
      label={label}
      style={{ flexDirection: 'row-reverse' }}
    />
  );
});

export default Extra;
