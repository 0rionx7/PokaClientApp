import { createContext, use, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGetGameStateQuery } from 'features/gameState/gameStateApi';
import { initialGameValues } from 'utils/games';

const GameBuilderContext = createContext({ values: {}, setValues: () => {} });

export default function GameBuilderContextProvider({ children }) {
  const { gameId } = useParams();
  const { data } = useGetGameStateQuery(gameId);
  const [values, setValues] = useState({
    ...initialGameValues,
    startingCard: data.startingCard,
  });

  return (
    <GameBuilderContext value={{ values, setValues }}>
      {children}
    </GameBuilderContext>
  );
}

export function useGameBuilderContext() {
  return use(GameBuilderContext);
}
