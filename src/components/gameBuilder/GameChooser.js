import { memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Field } from 'formik';

import { games, builderDefaults } from 'utils/games';
import { setCurrentChoosenGame } from 'features/gameState/gameStateSlice';

const startCard = [2, 3, 4, 5, 6, 7];

const GameChooser = memo(({ gameName, startingCard, setValues }) => {
  const dispatch = useDispatch();
  const game = games?.find(game => game.gameName === gameName);

  useEffect(() => {
    if (game) {
      const { builderDefaults: defaults, ...gameInfo } = game;
      setValues({
        ...builderDefaults,
        ...defaults,
        ...gameInfo, // for rowsIndexes, boardClass, showtitles
        startingCard,
      });
      dispatch(setCurrentChoosenGame(game.gameName));
    }
  }, [setValues, game, startingCard, dispatch]);

  return (
    <div className="game-chooser">
      <Field name="gameName">
        {({ field }) => (
          <select {...field}>
            {games?.map(game => (
              <option key={game.gameName} value={game.gameName}>
                {game.gameName}
              </option>
            ))}
          </select>
        )}
      </Field>
      <Field name="startingCard">
        {({ field }) => (
          <label className="starting-card">
            <div>ΜΙΚ. ΧΑΡΤΙ</div>
            <select {...field}>
              {startCard.map(value => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>
        )}
      </Field>
    </div>
  );
});

export default GameChooser;
