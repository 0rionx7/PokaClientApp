import { useFormikContext } from 'formik';

import { builderTitles } from 'common/text-constants';
import { gameNames } from 'common/games';
import { useMemo } from 'react';

const BuilderItem = ({ title, element }) => {
  const { values } = useFormikContext();
  const { gameName } = values;

  const hiddenWhenAny = useMemo(
    () => [
      title === builderTitles.TABLO &&
        gameName !== gameNames.KOYKOS_MONOS &&
        gameName !== gameNames.KOYKOS_DIPLOS &&
        gameName !== gameNames.MAMUT &&
        gameName !== gameNames.RAILROAD,
      title === builderTitles.RAILROAD_LENGTH &&
        gameName !== gameNames.RAILROAD,
      title === builderTitles.FACE_DOWN && gameName !== gameNames.POKER,
      title === builderTitles.CARDS_PER_LEG && gameName !== gameNames.CORNER,
      title === builderTitles.EXTRA &&
        gameName !== gameNames.MAMUT &&
        gameName !== gameNames.GRAVEYARD,
      (title === builderTitles.OPTIONS ||
        title === builderTitles.HAND_CARDS_IN_PLAY) &&
        [gameNames.GRAVEYARD, gameNames.KOUKOS, gameNames.POKER].some(
          game => game === gameName
        ),
    ],
    [title, gameName]
  );

  if (
    values.showTitles?.every(showTitle => showTitle !== title) ||
    hiddenWhenAny.some(Boolean)
  )
    return null;
  else
    return (
      <div className="frame-item builder-item">
        <div className="title"> {title}</div>
        <div className="controls"> {element}</div>
      </div>
    );
};

export default BuilderItem;
