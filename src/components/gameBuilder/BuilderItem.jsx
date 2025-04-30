import { useFormikContext } from 'formik';

import { builderTitles } from 'utils/text-constants';
import { gameNames } from 'utils/games';
import { useMemo } from 'react';

const showExtra = [
  gameNames.CROSS,
  gameNames.QUEEN,
  gameNames.TARGET,
  gameNames.GRAVEYARD,
  gameNames.MAMUT,
];

const BuilderItem = ({ title, element }) => {
  const { values } = useFormikContext();
  const { gameName } = values;

  const hiddenWhenAny = useMemo(
    () => [
      title === builderTitles.TABLO &&
        gameName !== gameNames.MAMUT &&
        gameName !== gameNames.RAILROAD,
      title === builderTitles.RAILROAD_LENGTH &&
        gameName !== gameNames.RAILROAD,
      title === builderTitles.CARDS_PER_LEG && gameName !== gameNames.CORNER,
      gameName !== gameNames.POKER &&
        (title === builderTitles.FACE_DOWN || title === builderTitles.SPEAKS),
      (title === builderTitles.OPTIONS ||
        title === builderTitles.HAND_CARDS_IN_PLAY) &&
        gameName === gameNames.POKER,
      title === builderTitles.EXTRA &&
        showExtra.every(title => title !== gameName),
    ],
    [title, gameName]
  );

  const item = (
    <div className="frame-item builder-item">
      <div className="title"> {title}</div>
      <div className="controls"> {element}</div>
    </div>
  );

  if (values.showTitles)
    return values.showTitles.some(showTitle => showTitle === title)
      ? item
      : null;

  return hiddenWhenAny.some(Boolean) ? null : item;
};

export default BuilderItem;
