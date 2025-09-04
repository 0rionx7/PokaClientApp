/* eslint-disable react-refresh/only-export-components */
import { createContext, use, useState } from 'react';

const RoomContext = createContext({
  actionContainerNode: null,
  setActionContainerNode: () => {},
  isDealing: false,
  setIsDealing: () => {},
});

export default function RoomContextProvider({ children }) {
  const [actionContainerNode, setActionContainerNode] = useState(null);
  const [isDealing, setIsDealing] = useState(false);

  return (
    <RoomContext
      value={{
        actionContainerNode,
        setActionContainerNode,
        isDealing,
        setIsDealing,
      }}
    >
      {children}
    </RoomContext>
  );
}

export const useRoomContext = () => use(RoomContext);
