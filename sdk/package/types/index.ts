import React, { LazyExoticComponent } from "react";
import { TBlock } from "./TBlock";

interface UiLibrary {
  name: string;
  uuid: string;
}

interface Block {
  type: string;
  [key: string]: any;
}

export type PredefinedBlock = {
  uuid: string;
  name: string;
  preview: string;
  blocks?: TBlock[];
  html?: string;
};

export type TPageData = {
  uuid?: string;
  page_name?: string;
  blocks: TBlock[];
  custom_code: string;
  seo_data: Record<string, string>;
  slug: string;
  translations: Record<string, Record<string, string>>;
};

export interface ChaiBuilderProviderProps {
  apiKey: string;
  blocks?: TBlock[];
  brandingOptions?: Record<string, string>;
  canvas?: React.FC<any>;
  previewLink?: string;
  canvasTopBarComponents?: {
    right?: React.LazyExoticComponent<any>[];
  };
  darkMode?: boolean;
  dndOptions?: any;
  fetchMediaCallback?: (limit?: number, offset?: number) => Promise<any[]>;
  frameworkPageUrl?: string;
  getExternalPredefinedBlock?: (
    block: PredefinedBlock,
  ) => Promise<PredefinedBlock & { blocks: TBlock[]; html: string }>;
  getUILibraryBlocks?: (libraryUuid: string) => Promise<PredefinedBlock[]>;
  globalBlocks?: Block[];
  globalBlocksSupport?: boolean;
  importHTML?: boolean;
  loadingCanvas?: boolean;
  mode?: "STATIC" | "EMAIL" | "GRAPHIC" | "PRESENTATION" | "FRAMEWORK";
  onSaveBlocks: ({ blocks, globalBlocks }: any) => Promise<any>;
  onSaveBrandingOptions: (brandingOptions: any) => Promise<any>;
  onSyncStatusChange?: (syncStatus: "UNSAVED" | "SAVED") => void;
  previewComponent?: LazyExoticComponent<any>;
  sideBarComponents?: {
    bottom?: [React.LazyExoticComponent<any>];
    top?: { icon: React.FC<any>; name: string; panel: React.LazyExoticComponent<any> }[];
  };
  topBarComponents?: {
    center?: React.LazyExoticComponent<any>[];
    left?: React.LazyExoticComponent<any>[];
    right?: React.LazyExoticComponent<any>[];
  };
  uiLibraries?: UiLibrary[];
  uploadMediaCallback?: (file: File) => Promise<string>;
  getPages?: () => Promise<TPageData[]>;
}

export type TStyleAttrs = {
  className: string;
  "data-block-parent": string;
  "data-style-id": string;
  "data-style-prop": string;
  onClick?: (e: any) => void;
  onMouseEnter?: (e: any) => void;
  onMouseLeave?: (e: any) => void;
};
