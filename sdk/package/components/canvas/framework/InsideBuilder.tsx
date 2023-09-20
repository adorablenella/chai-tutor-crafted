import React, { useEffect } from "react";
import { Provider, useAtom } from "jotai";
// @ts-ignore
import postRobot from "post-robot";
import Frame from "react-frame-component";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { HEAD_HTML } from "./HEAD_HTML";
import { RenderBlocksProps } from "./types";
import {
  canvasAllBlocksAtom,
  canvasDarkModeAtom,
  canvasHighlightedBlockAtom,
  canvasModelAtom,
  canvasProjectSettingsAtom,
  canvasSelectedBlockAtom,
  canvasSelectedBlockIdsAtom,
  canvasSelectedStylingBlockIdsAtom,
  canvasStore,
} from "./store";
import { CanvasContainer } from "./CanvasContainer";
import { FrameworkBlocksRenderer } from "./FrameworkBlocksRenderer";
import { BlockActions } from "./BlockFloatingActions";
import { KeyboardHandler } from "../KeyboarHandler";
import { HeadTags } from "./HeadTags";

const getElementByDataBlockId = (doc: any, blockId: string): HTMLElement =>
  doc.querySelector(`[data-block-id="${blockId}"]`) as HTMLElement;

const InsideBuilder = ({ model, styles }: Pick<RenderBlocksProps<"section" | "page">, "model"> & { styles?: any }) => {
  const [iframe, setIframe] = React.useState<HTMLIFrameElement>();
  const iframeRef = React.useRef();
  const [selectedBlockElement, setSelectedBlockElement] = React.useState<HTMLElement>();
  const [selectedBlock, setSelectedBlock] = useAtom(canvasSelectedBlockAtom);
  const [, setHighlightedId] = useAtom(canvasHighlightedBlockAtom);
  const [, setCanvasModel] = useAtom(canvasModelAtom);

  useEffect(() => {
    if (!document) return;
    // @ts-ignore
    postRobot.on("updateDarkMode", { window: window.parent }, (event: any) => {
      canvasStore.set(canvasDarkModeAtom, event.data.darkMode);
    });
    // @ts-ignore
    postRobot.on("updateBlocks", { window: window.parent }, (event: any) => {
      canvasStore.set(canvasAllBlocksAtom, event.data.allBlocks);
    });
    // @ts-ignore
    postRobot.on("updateProjectSettings", { window: window.parent }, (event: any) => {
      canvasStore.set(canvasProjectSettingsAtom, event.data.projectSettings);
    });
    // @ts-ignore
    postRobot.on("updateSelectedBlockIds", { window: window.parent }, (event: any) => {
      canvasStore.set(canvasSelectedBlockIdsAtom, event.data.ids);
    });
    // @ts-ignore
    postRobot.on("updateSelectedStyleIds", { window: window.parent }, (event: any) => {
      canvasStore.set(canvasSelectedStylingBlockIdsAtom, event.data.blocks);
    });
    // @ts-ignore
    postRobot.on("updateSelectedBlock", { window: window.parent }, (event: any) => {
      // @ts-ignore
      setSelectedBlock(event.data.selectedBlock);
    });
    // @ts-ignore
    postRobot.on("updateHighlightedBlockId", { window: window.parent }, (event: any) => {
      setHighlightedId(event.data.highlightedId);
    });

    // complete. send the loaded message to the parent window
    postRobot.send(window.parent, "initialize", { model });
    // canvasStore.set(canvasGlobalDataAtom, snapshot.globalData || {});
    setCanvasModel(model as "section" | "page");
  }, []);

  useEffect(() => {
    if (selectedBlock && selectedBlock.type !== "Multiple" && iframe) {
      const blockElement = getElementByDataBlockId(iframe.contentDocument, selectedBlock._id);
      if (blockElement) {
        setSelectedBlockElement(blockElement);
      }
    }
  }, [selectedBlock]);

  const emitEvent = (eventName: string, data: any) => {
    // @ts-ignore
    postRobot.send(window.parent, eventName, data);
  };

  return (
    <Frame
      style={styles || {}} // TODO: Later remove for section support
      id="inner-iframe"
      ref={iframeRef as any}
      contentDidMount={() => setTimeout(() => setIframe(iframeRef.current), 200)}
      className="relative mx-auto box-content h-screen w-full max-w-full transition-all duration-300 ease-linear"
      initialContent={HEAD_HTML}>
      <DndProvider backend={HTML5Backend}>
        <Provider store={canvasStore}>
          <KeyboardHandler sendToParent={emitEvent} />
          <BlockActions block={selectedBlock} selectedBlockElement={selectedBlockElement} sendToParent={emitEvent} />
          {iframeRef.current ? <HeadTags /> : null}
          <CanvasContainer sendToParent={emitEvent}>
            <FrameworkBlocksRenderer />
          </CanvasContainer>
        </Provider>
      </DndProvider>
    </Frame>
  );
};

export default InsideBuilder;
