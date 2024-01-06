import { useFormikContext } from 'formik';

import CheckBox from 'components/ui/CheckBox';
import { gameNames } from 'common/games';

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
  if (values.gameName === gameNames.QUEEN) {
    name = 'queens';
    label = 'ΜΠΑΛΑΝΤΕΡ ΚΑΙ ΟΙ ΝΤΑΜΕΣ';
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
