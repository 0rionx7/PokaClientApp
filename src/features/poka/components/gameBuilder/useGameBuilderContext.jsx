/* eslint-disable react-refresh/only-export-components */
import { createContext, use, useCallback, useState } from 'react';

import { useGetPokaStateQuery } from '@poka/api/pokaApi';
import { initialGameDefaults } from '@poka/utils/games';

const GameBuilderContext = createContext({
  values: {},
  status: {},
  setValues: () => {},
  setFieldValue: (_field, _value) => {},
  setStatus: () => {},
});

export default function GameBuilderContextProvider({ children }) {
  const { data } = useGetPokaStateQuery();
  const [values, setValues] = useState({
    ...initialGameDefaults,
    startingCard: data.startingCard || 7,
  });
  const [status, setStatus] = useState({});

  const setFieldValue = useCallback(
    (field, value) => setValues((prev) => ({ ...prev, [field]: value })),
    [],
  );

  return (
    <GameBuilderContext
      value={{ values, setValues, setFieldValue, status, setStatus }}
    >
      {children}
    </GameBuilderContext>
  );
}

export function useGameBuilderContext() {
  return use(GameBuilderContext);
}
