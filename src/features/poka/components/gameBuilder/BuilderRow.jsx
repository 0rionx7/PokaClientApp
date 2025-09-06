import { useGameBuilderContext } from '@poka/components/gameBuilder/useGameBuilderContext';
import { gameConfigs } from '@poka/utils/games';

const BuilderRow = ({ title, element }) => {
  const { values } = useGameBuilderContext();

  const builderConfig = gameConfigs[values.gameName].builderOptions;

  if (!builderConfig?.includes(title)) return null;

  return (
    <div className="frame-row builder-row">
      <div className="title"> {title}</div>
      <div className="controls"> {element}</div>
    </div>
  );
};

export default BuilderRow;
