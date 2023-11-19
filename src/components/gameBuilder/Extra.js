import { useFormikContext } from 'formik';

import { gameNames } from 'common/text-constants';
import CheckBox from 'components/ui/CheckBox';

const Extra = () => {
  const { values } = useFormikContext();
  let name, label;
  if (values.gameName === gameNames.GRAVEYARD) {
    name = 'allDiscardedWins';
    label = 'ΞΕΣΚΑΡΤΑΡΙΣΜΑ ΑΝΩΤΑΤΟ ΦΥΛΛΟ';
  }
  if (values.gameName === gameNames.MAMUT) {
    name = 'mirrorWins';
    label = 'ΚΑΘΡΕΦΤΗΣ ΑΝΩΤΑΤΟ ΦΥΛΛΟ';
  }

  return (
    <CheckBox
      name={name}
      label={label}
      style={{ flexDirection: 'row-reverse' }}
    />
  );
};

export default Extra;
