import { memo } from 'react';
import { useDispatch } from 'react-redux';

import { games, builderDefaults, gameNames } from 'utils/games';
import { setCurrentChoosenGame } from 'features/gameState/gameStateSlice';
import { useGameBuilderContext } from 'hooks/gameBuilderContext';
import { useState } from 'react';

const startCard = [2, 3, 4, 5, 6, 7];

const GameChooser = memo(() => {
  const [prevGame, setPrevGame] = useState(gameNames.MAMUT);
  const { values, setValues } = useGameBuilderContext();
  const dispatch = useDispatch();
  const game = games?.find(game => game.gameName === values.gameName);

  if (values.gameName !== prevGame) {
    setPrevGame(values.gameName);
    const { builderDefaults: defaults, ...gameInfo } = game;
    setValues({
      ...builderDefaults,
      ...defaults,
      ...gameInfo, // for rowsIndexes, boardClass, showtitles
      startingCard: values.startingCard,
    });
    dispatch(setCurrentChoosenGame(game.gameName));
  }

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
          {startCard.map(value => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
});

export default GameChooser;
