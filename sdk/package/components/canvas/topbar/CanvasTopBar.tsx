import React from "react";
import { round } from "lodash";
import { ZoomInIcon } from "@radix-ui/react-icons";
import { UndoRedo } from "./UndoRedo";
import { Separator } from "../../../radix-ui";
import { DarkMode } from "./DarkMode";
import { Breakpoints } from "./Breakpoints";
import { ClearCanvas } from "./ClearCanvas";
import { useFeatureSupport } from "../../../hooks/useFeatureSupport";
import { useCanvasZoom } from "../../../hooks";

const CanvasTopBar: React.FC = () => {
  const darkModeSupport = useFeatureSupport("darkMode", false);
  const [zoom] = useCanvasZoom();

  return (
    <div className="flex h-10 items-center justify-between border-b bg-background/70 px-2">
      <div className="flex h-full space-x-2">
        {darkModeSupport ? (
          <>
            <DarkMode />
            <Separator orientation="vertical" />
          </>
        ) : null}
        <Breakpoints />
        <Separator orientation="vertical" />
        <div className="flex w-12 items-center justify-center gap-x-1 space-x-0 font-medium">
          <ZoomInIcon className="h-3.5 w-3.5 flex-shrink-0" />{" "}
          <div className="text-xs leading-3">{round(zoom, 0)}%</div>
        </div>
        <Separator orientation="vertical" />
        <UndoRedo />
      </div>
      <div className="flex h-full items-center space-x-2">
        {/* <div className="max-w-96 bg-blue-600">Custom Canvas Topbar</div> */}
        <Separator orientation="vertical" />
        <ClearCanvas />
        {/*<Separator orientation="vertical" />*/}
        {/*<Preview />*/}
      </div>
    </div>
  );
};

export { CanvasTopBar };
