import { createContext } from "react";

export const StyleContext = createContext({ canReset: false, canChange: true });

export const BlockStyleProvider = ({ children, canReset = false, canChange = true }: any) => (
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  <StyleContext.Provider value={{ canReset, canChange }}>{children}</StyleContext.Provider>
);
