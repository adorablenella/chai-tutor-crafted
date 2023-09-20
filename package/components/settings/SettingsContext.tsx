import React from "react";

export const BlockSettingsContext = React.createContext<{ setDragData: Function }>({
  setDragData: () => {},
});
