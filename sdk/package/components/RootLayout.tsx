import React, { lazy, MouseEvent, Suspense } from "react";
import { isDevelopment } from "../helpers/general";
import { TooltipProvider } from "../radix-ui";
import { PreviewScreen } from "./PreviewScreen";

const SidePanels = lazy(() => import("./sidepanels/SidePanels"));
const TopBar = lazy(() => import("./topbar/Topbar"));
const CanvasArea = lazy(() => import("./canvas/CanvasArea"));
const Settings = lazy(() => import("./settings/Settings"));

/**
 * RootLayout is a React component that renders the main layout of the application.
 */
const RootLayout: React.FC = () => {
  /**
   * Prevents the context menu from appearing in production mode.
   * @param {MouseEvent<HTMLDivElement>} e - The mouse event.
   */
  const preventContextMenu = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDevelopment()) e.preventDefault();
  };

  return (
    <div className="h-screen w-screen bg-background text-foreground">
      <TooltipProvider>
        <div
          onContextMenu={preventContextMenu}
          className="flex h-screen flex-col overflow-hidden bg-background text-foreground">
          <div className="h-14 w-screen shrink-0 border-b border-border">
            <Suspense>
              <TopBar />
            </Suspense>
          </div>
          <main className="flex h-full flex-row">
            <div className="flex h-full w-fit border-border">
              <Suspense>
                <SidePanels />
              </Suspense>
            </div>
            <div className="h-full flex-1 bg-slate-800/20">
              <Suspense>
                <CanvasArea />
              </Suspense>
            </div>
            <div className="flex h-full w-[280px] min-w-[280px] border-l border-border">
              <Suspense>
                <Settings />
              </Suspense>
            </div>
          </main>
        </div>
        {/* Preview screen wrapepr */}
        <PreviewScreen />
      </TooltipProvider>
    </div>
  );
};

export { RootLayout };
