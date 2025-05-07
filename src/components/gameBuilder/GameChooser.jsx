import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { games, builderDefaults } from 'utils/games';
import { setCurrentChoosenGame } from 'features/gameState/gameStateSlice';
import { useGameBuilderContext } from 'hooks/gameBuilderContext';

const startingCards = [2, 3, 4, 5, 6, 7];

const GameChooser = () => {
  const { values, setValues } = useGameBuilderContext();
  const dispatch = useDispatch();
  const game = games?.find(game => game.gameName === values.gameName);

  useEffect(() => {
    if (game) {
      const { builderDefaults: defaults, ...gameInfo } = game;
      setValues({
        ...builderDefaults,
        ...defaults,
        ...gameInfo, // for rowsIndexes, boardClass, showtitles
        startingCard: values.startingCard,
      });
      dispatch(setCurrentChoosenGame(game.gameName));
    }
  }, [setValues, game, values.startingCard, dispatch]);

  return (
    <div className="game-chooser">
      <select
        name="gameName"
        defaultValue={values.gameName}
        onChange={e => setValues({ ...values, gameName: e.target.value })}>
        {games?.map(game => (
          <option key={game.gameName} value={game.gameName}>
            {game.gameName}
          </option>
        ))}
      </select>
      <label className="starting-card">
        <div>ΜΙΚ. ΧΑΡΤΙ</div>
        <select name="startingCard" defaultValue={values.startingCard}>
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
