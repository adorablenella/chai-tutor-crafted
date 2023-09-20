import React from "react";
import { round } from "lodash";
import { ZoomInIcon } from "@radix-ui/react-icons";
import { UndoRedo } from "./UndoRedo";
import { Separator } from "../../../radix-ui";
import { DarkMode } from "./DarkMode";
import { Breakpoints } from "./Breakpoints";
import { Preview } from "./Preview";
import { ClearCanvas } from "./ClearCanvas";
import { useFeatureSupport } from "../../../hooks/useFeatureSupport";
import { useCanvasZoom } from "../../../hooks";

const CanvasTopBar: React.FC = () => {
  const darkModeSupport = useFeatureSupport("darkMode", false);
  const [zoom] = useCanvasZoom();

  return (
    <div className="flex items-center justify-between h-10 bg-background/70 px-2 border-b">
      <div className="flex h-full space-x-2">
        {darkModeSupport ? (
          <>
            <DarkMode />
            <Separator orientation="vertical" />
          </>
        ) : null}
        <Breakpoints />
        <Separator orientation="vertical" />
        <div className="flex items-center space-x-0 justify-center font-medium gap-x-1 w-12">
          <ZoomInIcon className="flex-shrink-0 w-3.5 h-3.5" />{" "}
          <div className="leading-3 text-xs">{round(zoom, 0)}%</div>
        </div>
        <Separator orientation="vertical" />
        <UndoRedo />
      </div>
      <div className="flex h-full items-center space-x-2">
        {/* <div className="max-w-96 bg-blue-600">Custom Canvas Topbar</div> */}
        <Separator orientation="vertical" />
        <ClearCanvas />
        <Separator orientation="vertical" />
        <Preview />
      </div>
    </div>
  );
};

export { CanvasTopBar };
