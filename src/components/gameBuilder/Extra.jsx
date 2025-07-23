import { memo } from 'react';

import { useGameBuilderContext } from 'hooks/gameBuilderContext';
import { getNameAndLabel } from 'utils/text-functions';
import CheckBox from 'components/ui/CheckBox';

const Extra = memo(() => {
  const { values, setValues } = useGameBuilderContext();
  const { name, label } = getNameAndLabel(values.gameName);

  return (
    <CheckBox
      label={label}
      style={{ flexDirection: 'row-reverse' }}
      checked={values[name]}
      onChange={e => setValues(prev => ({ ...prev, [name]: e.target.checked }))}
    />
  );
});

export default Extra;
