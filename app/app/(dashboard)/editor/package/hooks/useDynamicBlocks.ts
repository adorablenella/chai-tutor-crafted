import { atom, useAtom } from "jotai";

const dynamicBlocksAtom = atom({
  Disclosure: "",
  Dialog: "",
  Popover: "",
  Menu: "",
  NavLink: "",
});

export const useDynamicBlocks = () => useAtom(dynamicBlocksAtom);
