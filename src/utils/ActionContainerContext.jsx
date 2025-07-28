import { createContext, use, useState } from 'react';

const ActionContainerContext = createContext({
  actionContainerNode: null,
  setActionContainerNode: () => {},
});

export default function ActionContaineContextProvider({ children }) {
  const [actionContainerNode, setActionContainerNode] = useState(null);

  return (
    <ActionContainerContext
      value={{ actionContainerNode, setActionContainerNode }}>
      {children}
    </ActionContainerContext>
  );
}

export const useActionContainerNode = () => use(ActionContainerContext);
