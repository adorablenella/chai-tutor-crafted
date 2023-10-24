import { Half2Icon, PlusIcon, StackIcon } from "@radix-ui/react-icons";
import React, { lazy, LazyExoticComponent, Suspense, useState } from "react";
import { useAtom } from "jotai";
import { each, get } from "lodash";
import { Button } from "../../radix-ui";
import { activePanelAtom } from "../../store/ui";
import { useBuilderProp } from "../../hooks/useBuilderProp";
import { Skeleton } from "../../radix/components/ui/skeleton";
import { cn } from "../../radix/lib/utils";
import { addBlocksModalAtom } from "@/sdk/package/store/blocks";

const AddBlocksPanel = lazy(() => import("./panels/add-blocks/AddBlocks"));
const LayersPanel = lazy(() => import("./panels/layers/Layers"));
const BrandingOptions = lazy(() => import("./panels/branding/BrandingOptions"));
const ImagesPanel = lazy(() => import("./panels/images/ImagesPanel"));

let timeout: any = null;

const SidePanels = () => {
  const topComponents: { icon: React.FC<any>; name: string; panel: LazyExoticComponent<any> }[] = useBuilderProp(
    "sideBarComponents.top",
    [],
  );
  const bottomComponents: LazyExoticComponent<any>[] = useBuilderProp("sideBarComponents.bottom", []);
  const [activePanel, setActivePanel] = useAtom(activePanelAtom);
  const [_activePanel, _setActivePanel] = useState(activePanel);
  const [hideTimeout, setHideTimeout] = useState<any>(null);

  const panels: { [key: string]: LazyExoticComponent<any> } = {
    "add-blocks": AddBlocksPanel,
    layers: LayersPanel,
    "branding-options": BrandingOptions,
    images: ImagesPanel,
  };
  each(topComponents, ({ name, panel }) => {
    panels[name] = panel;
  });

  const handleChangePanel = (newPanel: string) => {
    // * Waiting for panel to slide in before changing its content
    clearTimeout(timeout);
    if (activePanel !== "layers" && newPanel === "layers") {
      timeout = setTimeout(() => _setActivePanel("layers"), 500);
    } else {
      _setActivePanel(newPanel);
    }
    setActivePanel(newPanel);
  };
  const [, setAddBlocks] = useAtom(addBlocksModalAtom);

  return (
    <div className="relative flex">
      <div className="z-[100] flex h-full w-fit flex-col items-center justify-between border-b border-r border-border bg-background pt-2">
        <div className="relative z-[100] flex w-14  flex-col items-center space-y-2">
          <Button
            onClick={() => setAddBlocks(true)}
            size="sm"
            variant={activePanel === "add-blocks" ? "default" : "outline"}>
            <PlusIcon className="text-xl" />
          </Button>
          <Button
            onClick={() => handleChangePanel("layers")}
            size="sm"
            variant={activePanel === "layers" ? "default" : "outline"}>
            <StackIcon className="text-xl" />
          </Button>
          <Button
            onClick={() => handleChangePanel("branding-options")}
            size="sm"
            variant={activePanel === "branding-options" ? "default" : "outline"}>
            <Half2Icon className="w-4 max-w-[40px] text-xs" />
          </Button>
          {React.Children.toArray(
            topComponents.map(({ name, icon: PanelIcon }) => (
              <Suspense fallback={<Skeleton className="h-10" />}>
                <Button
                  onClick={() => handleChangePanel(name)}
                  size="sm"
                  className="w-10"
                  variant={activePanel === name ? "default" : "outline"}>
                  <PanelIcon />
                </Button>
              </Suspense>
            )),
          )}
        </div>
        <div className="flex flex-col items-center space-y-2">
          {React.Children.toArray(
            bottomComponents.map((Component) => (
              <Suspense fallback={<Skeleton className="h-10" />}>
                <Component />
              </Suspense>
            )),
          )}
        </div>
      </div>
      <div
        onClick={() => {
          handleChangePanel("layers");
        }}
        className={"absolute inset-0 right-0 z-50 w-screen bg-black/20" + (activePanel === "layers" ? " hidden" : "")}
      />
      <div
        className={`fixed left-14 z-[50] h-full w-96 border-r bg-background duration-500 ease-in-out ${
          activePanel !== "layers" ? "translate-x-0" : "-translate-x-full"
        }`}>
        <Suspense
          fallback={
            <div className="flex animate-pulse flex-col gap-y-2 bg-white p-4">
              <div className="h-6 w-1/2 bg-gray-300" />
              <div className="h-16 w-full bg-gray-200" />
              <div className="h-16 w-full bg-gray-200" />
            </div>
          }>
          <div
            className={cn("relative h-full max-h-[93%] bg-background p-1", activePanel === "layers" ? "" : "z-[100]")}
            onMouseEnter={() => {
              if (hideTimeout) clearTimeout(hideTimeout);
            }}
            onMouseLeave={() => {
              const timeout = setTimeout(() => {
                if (hideTimeout) {
                  handleChangePanel("layers");
                  clearTimeout(hideTimeout);
                }
              }, 1000);
              setHideTimeout(timeout);
            }}>
            {React.createElement(get(panels, _activePanel, () => <div />))}
          </div>
        </Suspense>
      </div>
      <div className="h-full w-60 border-r p-1">
        <Suspense
          fallback={
            <div className="flex animate-pulse flex-col gap-y-2 p-4">
              <div className="h-6 w-1/2 bg-gray-300" />
              <div className="h-16 w-full bg-gray-200" />
              <div className="h-16 w-full bg-gray-200" />
            </div>
          }>
          {React.createElement(LayersPanel)}
        </Suspense>
      </div>
    </div>
  );
};

export default SidePanels;
