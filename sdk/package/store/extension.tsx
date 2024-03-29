import { atom } from "jotai";

export const builderPropsAtom: any = atom({
  modals: {},
  importHTML: false,
  globalBlocksSupport: true,
  topBarRightButtons: [],
  contextMenuItems: [],
  layerItemButtons: [],
  hasPermission: () => true,
  getPredefinedBlock: async () => [],
  getUiLibraryBlocks: async () => [],
  getBlocksWithAI: undefined,
  onSavePage: async () => {},
  onPageChange: () => {},
  onSyncStateChange: () => {},
  logo: <h1 className="relative text-xl font-black">Chai Builder</h1>,
  breakpoints: [],
  darkMode: true,
  excludeSettingProperties: [],
  excludeSettingSections: [],
  excludeCoreBlocks: [],
  panels: [],
  previewComponent: () => <div>Preview</div>,
  codeEditorComponent: () => <div>ddd</div>,
  onBuilderEvent: () => {},
  languages: ["en"],
});
