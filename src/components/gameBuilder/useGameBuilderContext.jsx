import { createContext, use, useCallback, useState } from 'react';

import { initialGameDefaults } from 'utils/games';

const GameBuilderContext = createContext({
  values: {},
  status: {},
  setValues: () => {},
  setFieldValue: (field, value) => {},
  setStatus: () => {},
});

export default function GameBuilderContextProvider({ children }) {
  const [values, setValues] = useState({
    ...initialGameDefaults,
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
