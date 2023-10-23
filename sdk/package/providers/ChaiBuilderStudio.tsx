import { FlagsProvider } from "flagged";
import React, { useEffect } from "react";
import { DndProvider, useDragLayer } from "react-dnd";
import { omit } from "lodash";
import { getBackendOptions, MultiBackend } from "@minoru/react-dnd-treeview";
import { FEATURE_TOGGLES } from "../FEATURE_TOGGLES";
import { chaiBuilderPropsAtom } from "../atoms/ChaiBuilderProps";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { RootLayout } from "../components/RootLayout";
import "../locales/load";
import { ChaiBuilderProviderProps } from "../types/index";
import { builderModeAtom } from "../hooks/useBuilderMode";
import { BUILDER_MODES } from "../constants/BUILDER_MODES";
import { builderStore } from "../store";
import { useSetAllBlocks } from "../hooks/useTreeData";
import { Toaster } from "../radix/components/ui/toaster";
import { useBuilderReset } from "../hooks/useBuilderReset";
import { syncBlocksWithDefaults } from "@/sdk/package/blocks/builder-blocks";
import { useBrandingOptions } from "../hooks";

const DragLayerComponent = (props: any) => {
  const { isDragging } = useDragLayer((monitor) => ({
    isDragging: monitor.isDragging(),
  }));

  return <>{props.children}</>;
};

const ChaiBuilder = (props: ChaiBuilderProviderProps) => {
  const { dndOptions = { backend: MultiBackend } } = props;
  const [setAllBlocks] = useSetAllBlocks();
  const [, setBrandingOptions] = useBrandingOptions();
  const reset = useBuilderReset();

  useEffect(() => {
    // @ts-ignore
    builderStore.set(chaiBuilderPropsAtom, omit(props, ["blocks", "globalBlocks", "brandingOptions"]));
    builderStore.set(builderModeAtom, props.mode || BUILDER_MODES.STATIC);
    // TODO: Add a way to check if the provided API_key is valid or not
  }, [props]);

  useEffect(() => {
    setAllBlocks(syncBlocksWithDefaults(props.blocks || []));
    reset();
  }, [props.blocks]);

  useEffect(() => {
    setBrandingOptions(props.brandingOptions);
  }, [props.brandingOptions]);

  return (
    <DndProvider {...dndOptions} options={getBackendOptions()}>
      <DragLayerComponent>
        <RootLayout />
      </DragLayerComponent>
    </DndProvider>
  );
};

const ChaiBuilderStudio = (props: ChaiBuilderProviderProps) => (
  <ErrorBoundary>
    <FlagsProvider features={FEATURE_TOGGLES}>
      <ChaiBuilder {...props} />
    </FlagsProvider>
    <Toaster />
  </ErrorBoundary>
);

export { ChaiBuilderStudio };
