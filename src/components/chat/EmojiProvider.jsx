/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';

const EmojiContext = createContext({
  showPicker: false,
  setShowPicker: () => {},
});

export const EmojiProvider = ({ children }) => {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <EmojiContext.Provider value={{ showPicker, setShowPicker }}>
      {children}
    </EmojiContext.Provider>
  );
};

export default EmojiProvider;
export const useEmoji = () => useContext(EmojiContext);
