import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { setCurrentChoosenGame } from 'features/poka/pokaStateSlice';
import { useGameBuilderContext } from 'components/gameBuilder/useGameBuilderContext';
import {
  builderDefaults,
  gameNames,
  gameConfigs,
} from 'features/poka/utils/games';

const startingCards = [2, 3, 4, 5, 6, 7];

const GameChooser = () => {
  const { values, setValues, setFieldValue } = useGameBuilderContext();
  const dispatch = useDispatch();

  const handleGameChange = e => {
    const gameName = e.target.value;
    const gameConfig = gameConfigs[gameName];
    if (!gameConfig) return;
    setValues({
      ...builderDefaults,
      ...gameConfig.builderDefaults,
      gameName,
      startingCard: values.startingCard,
    });
    dispatch(setCurrentChoosenGame(gameName));
  };

  const games = useMemo(
    () =>
      Object.values(gameNames).map(game => (
        <option key={game} value={game}>
          {game}
        </option>
      )),
    []
  );

  return (
    <div className="game-chooser">
      <select value={values.gameName} onChange={handleGameChange}>
        {games}
      </select>
      <label className="starting-card">
        <div>ΜΙΚ. ΧΑΡΤΙ</div>
        <select
          name="startingCard"
          value={values.startingCard}
          onChange={e => setFieldValue('startingCard', +e.target.value)}>
          {startingCards.map(value => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default GameChooser;
