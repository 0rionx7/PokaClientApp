import { createContext, useContext, useState } from 'react';

const ActionContainerContext = createContext({
  actionContainerRef: null,
  setContainerRef: () => {},
});

export default function ActionContaineProvider({ children }) {
  const [actionContainerRef, setContainerRef] = useState(null);

  return (
    <ActionContainerContext.Provider
      value={{ actionContainerRef, setContainerRef }}>
      {children}
    </ActionContainerContext.Provider>
  );
}

export const useActionConRef = () => useContext(ActionContainerContext);
