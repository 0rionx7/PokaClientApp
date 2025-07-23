import { builderTitle } from 'utils/text-constants';
import { gameNames } from 'utils/games';
import { useMemo } from 'react';
import { useGameBuilderContext } from 'hooks/gameBuilderContext';

const showExtra = [
  gameNames.CROSS,
  gameNames.QUEEN,
  gameNames.TARGET,
  gameNames.GRAVEYARD,
  gameNames.MAMUT,
];

const BuilderItem = ({ title, element, ref }) => {
  const { values } = useGameBuilderContext();
  const { gameName } = values;

  const hiddenWhenAny = useMemo(
    () => [
      title === builderTitle.TABLO &&
        gameName !== gameNames.MAMUT &&
        gameName !== gameNames.RAILROAD,
      title === builderTitle.RAILROAD_LENGTH && gameName !== gameNames.RAILROAD,
      title === builderTitle.CARDS_PER_LEG && gameName !== gameNames.CORNER,
      gameName !== gameNames.POKER &&
        (title === builderTitle.FACE_DOWN || title === builderTitle.SPEAKS),
      (title === builderTitle.OPTIONS ||
        title === builderTitle.HAND_CARDS_IN_PLAY) &&
        gameName === gameNames.POKER,
      title === builderTitle.EXTRA &&
        showExtra.every(title => title !== gameName),
    ],
    [title, gameName]
  );

  const item = (
    <div ref={ref} className="frame-item builder-item" key={values.gameName}>
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
