import { memo } from 'react';

import { useGameBuilderContext } from 'components/gameBuilder/useGameBuilderContext';
import { getNameAndLabel } from 'utils/text-functions';
import CheckBox from 'components/ui/CheckBox';

const Extra = memo(() => {
  const { values, setFieldValue } = useGameBuilderContext();
  const { name, label } = getNameAndLabel(values.gameName);

  return (
    <CheckBox
      label={label}
      name={name}
      style={{ flexDirection: 'row-reverse' }}
      checked={!!values[name]}
      onChange={e => setFieldValue(name, e.target.checked)}
    />
  );
});

export default Extra;
