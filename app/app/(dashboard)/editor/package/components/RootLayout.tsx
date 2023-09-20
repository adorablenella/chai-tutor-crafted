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
    <div className="h-screen w-screen">
      <TooltipProvider>
        <div
          onContextMenu={preventContextMenu}
          className="flex flex-col h-screen text-foreground bg-background overflow-hidden">
          <div className="h-14 w-screen border-b border-border shrink-0">
            <Suspense>
              <TopBar />
            </Suspense>
          </div>
          <main className="flex flex-row h-[calc(100vh-3.5rem)]">
            <div className="h-full w-fit flex border-border">
              <Suspense>
                <SidePanels />
              </Suspense>
            </div>
            <div className="flex-1 h-full bg-slate-800/20">
              <Suspense>
                <CanvasArea />
              </Suspense>
            </div>
            <div className="h-full flex w-[280px] min-w-[280px] border-border border-l">
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
