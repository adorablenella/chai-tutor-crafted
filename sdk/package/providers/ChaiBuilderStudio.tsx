import { FlagsProvider } from "flagged";
import React, { useEffect } from "react";
import { DndProvider } from "react-dnd";
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
import "../blocks/core-blocks";
import { useSetAllBlocks } from "../hooks/useTreeData";
import { Toaster } from "../radix/components/ui/toaster";
import { useBuilderReset } from "../hooks/useBuilderReset";

const ChaiBuilder = (props: ChaiBuilderProviderProps) => {
  const { dndOptions = { backend: MultiBackend } } = props;
  const [setAllBlocks] = useSetAllBlocks();
  const reset = useBuilderReset();
  useEffect(() => {
    // @ts-ignore
    builderStore.set(chaiBuilderPropsAtom, omit(props, ["blocks", "globalBlocks", "brandingOptions"]));
    builderStore.set(builderModeAtom, props.mode || BUILDER_MODES.STATIC);
    // TODO: Add a way to check if the provided API_key is valid or not
  }, [props]);

  useEffect(() => {
    reset();
    setAllBlocks(props.blocks);
    console.log("Need to reset history here as well");
  }, [props.blocks]);

  return (
    <DndProvider {...dndOptions} options={getBackendOptions()}>
      <RootLayout />
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
