import { useDispatch } from 'react-redux';

import { setCurrentChoosenGame } from 'features/gameState/gameStateSlice';
import { useGameBuilderContext } from 'hooks/useGameBuilderContext';
import { builderDefaults, gameDefaults } from 'utils/games';

const startingCards = [2, 3, 4, 5, 6, 7];

const GameChooser = () => {
  const { values, setValues } = useGameBuilderContext();
  const dispatch = useDispatch();

  const handleGameChange = e => {
    const gameDefault = gameDefaults.find(
      game => game.gameName === e.target.value
    );
    if (!gameDefault) return;
    setValues(prev => ({
      ...builderDefaults,
      ...gameDefault,
      startingCard: prev.startingCard,
    }));
    dispatch(setCurrentChoosenGame(gameDefault.gameName));
  };

  return (
    <div className="game-chooser">
      <select value={values.gameName} onChange={handleGameChange}>
        {gameDefaults?.map(game => (
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
