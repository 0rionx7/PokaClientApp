import { createContext, use, useCallback, useState } from 'react';

import { useGetPokaStateQuery } from '@poka/api/pokaApi';
import { useParams } from 'react-router-dom';

import { initialGameDefaults } from '@poka/utils/games';

const GameBuilderContext = createContext({
  values: {},
  status: {},
  setValues: () => {},
  setFieldValue: (field, value) => {},
  setStatus: () => {},
});

export default function GameBuilderContextProvider({ children }) {
  const { gameId } = useParams();
  const { data } = useGetPokaStateQuery(gameId);
  const [values, setValues] = useState({
    ...initialGameDefaults,
    startingCard: data.startingCard || 7,
  });
  const [status, setStatus] = useState({});

  const setFieldValue = useCallback(
    (field, value) => setValues(prev => ({ ...prev, [field]: value })),
    []
  );

  return (
    <GameBuilderContext
      value={{ values, setValues, setFieldValue, status, setStatus }}>
      {children}
    </GameBuilderContext>
  );
}

export function useGameBuilderContext() {
  return use(GameBuilderContext);
}
