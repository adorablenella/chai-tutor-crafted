import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import Frame, { FrameContext, useFrame } from "react-frame-component";
import { Transition } from "@headlessui/react";
import { first, isEmpty } from "lodash";
import { useAtom } from "jotai";
import { DndContext } from "react-dnd";
import {
  useCanvasWidth,
  useCanvasZoom,
  useHighlightBlockId,
  usePreviewMode,
  useSelectedBlockIds,
} from "../../../hooks";
import { IframeInitialContent } from "../IframeInitialContent";
import { HeadTags } from "./HeadTags";
import { KeyboardHandler } from "../KeyboarHandler";
import { canvasIframeAtom, networkModeAtom } from "../../../store/ui";
import { StaticBlocksRenderer } from "./StaticBlocksRenderer";
import { BlockActionsStatic } from "../BlockFloatingActions";
import { Skeleton } from "../../../radix/components/ui/skeleton";
import { useBuilderProp } from "../../../hooks/useBuilderProp";
import { useSelectedBlock } from "../../../hooks/useSelectedBlockIds";
import { useSelectedStylingBlocks } from "../../../hooks/useSelectedStylingBlocks";
import { TBlock } from "../../../types/TBlock";

const Canvas = ({ children }: { children: React.ReactNode }) => {
  const { document } = useFrame();
  const [ids, setSelected] = useSelectedBlockIds();
  const [styleIds, setSelectedStylingBlocks] = useSelectedStylingBlocks();

  useEffect(() => {
    setTimeout(() => {
      if (!isEmpty(styleIds)) {
        return;
      }
      const element = getElementByDataBlockId(document, first(ids) as string);
      if (element) {
        const styleProp = element.getAttribute("data-style-prop") as string;
        if (styleProp) {
          const styleId = element.getAttribute("data-style-id") as string;
          const blockId = element.getAttribute("data-block-parent") as string;
          setSelectedStylingBlocks([{ id: styleId, prop: styleProp, blockId }]);
        }
      }
    }, 100);
  }, [document, ids, styleIds]);

  return (
    <Transition
      enter="transition ease-out duration-300"
      enterFrom="transform opacity-0"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-300"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
      show
      appear
      id="canvas"
      className={`relative h-screen max-w-full outline-2`}>
      {children}
    </Transition>
  );
};

const useCanvasScale = (dimension: { height: number; width: number }) => {
  const [canvasWidth] = useCanvasWidth();
  const [, setZoom] = useCanvasZoom();
  const [scale, setScale] = useState({});
  const updateScale = useCallback(() => {
    const { width, height } = dimension;
    if (width < canvasWidth) {
      const newScale: number = parseFloat((width / canvasWidth).toString());
      let heightObj = {};
      if (height) {
        heightObj = { height: height + 2 * height * (1 - newScale) };
      }
      setScale({
        transform: `scale(${newScale})`,
        transformOrigin: "top left",
        ...heightObj,
        maxWidth: "none",
      });

      setZoom(newScale * 100);
    } else {
      setScale({});
      setZoom(100);
    }
  }, [canvasWidth, dimension, setZoom]);

  useEffect(() => {
    updateScale();
  }, [canvasWidth, dimension, setZoom, updateScale]);

  return scale;
};

// eslint-disable-next-line react/no-unused-prop-types
export const DndFrame = ({ children }: any) => {
  const { dragDropManager } = useContext(DndContext);
  const { window } = useContext(FrameContext);

  useEffect(() => {
    // @ts-ignore
    dragDropManager.getBackend().addEventListeners(window);
  });

  return children;
};

const getElementByDataBlockId = (doc: any, blockId: string): HTMLElement =>
  doc.querySelector(`[data-block-id="${blockId}"]`) as HTMLElement;

const getElementByStyleId = (doc: any, styleId: string): HTMLElement =>
  doc.querySelector(`[data-style-id="${styleId}"]`) as HTMLElement;

const StaticCanvas = (): React.JSX.Element => {
  const [networkMode] = useAtom(networkModeAtom);
  const [preview] = usePreviewMode();
  const [width] = useCanvasWidth();
  const [, setIds] = useSelectedBlockIds();
  const selectedBlock: any = useSelectedBlock();
  const [, highlight] = useHighlightBlockId();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const scale = useCanvasScale(dimension);
  const [initialWidth, setInitialWidth] = useState(0);
  const [selectedElements, setSelectedElements] = useState<HTMLElement[]>([]);
  const [selectedStyleElements, setSelectedStyleElements] = useState<HTMLElement[] | null[]>([]);
  const [, setCanvasIframe] = useAtom(canvasIframeAtom);
  const [stylingBlocks, setStylingBlocks] = useSelectedStylingBlocks();
  const loadingCanvas = useBuilderProp("loadingCanvas", false);

  useEffect(() => {
    const { clientWidth, clientHeight } = wrapperRef.current as HTMLDivElement;
    setDimension({ width: clientWidth, height: clientHeight });
    if (initialWidth === 0) {
      setInitialWidth(clientWidth);
    }
  }, [wrapperRef, width, initialWidth]);

  const isInViewport = (element: HTMLElement, offset = 0) => {
    const { top } = element.getBoundingClientRect();
    return top + offset >= 0 && top - offset <= window.innerHeight;
  };

  useEffect(() => {
    if (selectedBlock && selectedBlock.type !== "Multiple" && iframeRef.current) {
      const blockElement = getElementByDataBlockId(iframeRef.current.contentDocument, selectedBlock._id);
      if (blockElement) {
        if (!isInViewport(blockElement)) {
          iframeRef.current?.contentWindow?.scrollTo({ top: blockElement.offsetTop, behavior: "smooth" });
        }
        setSelectedElements([blockElement]);
      }
    }
  }, [selectedBlock]);

  useEffect(() => {
    if (!isEmpty(stylingBlocks) && iframeRef.current) {
      const selectedStyleElement = getElementByStyleId(
        iframeRef.current.contentDocument,
        (first(stylingBlocks) as { id: string }).id,
      );
      if (selectedStyleElement) {
        setSelectedStyleElements([selectedStyleElement]);
      } else {
        setSelectedStyleElements([null]);
      }
    } else {
      setSelectedStyleElements([null]);
    }
  }, [stylingBlocks]);

  const iframeContent: string = useMemo(() => {
    let initialHTML = IframeInitialContent;
    if (networkMode === "offline") {
      initialHTML = initialHTML.replace(
        "https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio",
        "/offline/tailwind.cdn.js",
      );
      initialHTML = initialHTML.replace("https://unpkg.com/aos@next/dist/aos.css", "/offline/aos.css");
      initialHTML = initialHTML.replace("https://unpkg.com/aos@next/dist/aos.js", "/offline/aos.js");
    }
    return initialHTML;
  }, [networkMode]);

  return (
    <div
      onClick={() => {
        setIds([]);
        setStylingBlocks([]);
      }}
      onMouseLeave={() => setTimeout(() => highlight(""), 300)}
      className="relative mx-auto h-full w-full bg-black/80"
      style={initialWidth > 0 && !isEmpty(scale) ? { width: preview ? "100%" : initialWidth } : {}}
      ref={wrapperRef}>
      <Frame
        contentDidMount={() => setCanvasIframe(iframeRef.current as HTMLIFrameElement)}
        ref={iframeRef as any}
        id="canvas-iframe"
        style={{ width: `${width}px`, ...scale }}
        className="relative mx-auto box-content h-full max-w-full shadow-md transition-all duration-300 ease-linear"
        initialContent={iframeContent}>
        <KeyboardHandler />
        <BlockActionsStatic block={selectedBlock as unknown as TBlock} selectedBlockElement={first(selectedElements)} />
        <HeadTags model="page" />
        <Canvas>
          {loadingCanvas ? (
            <div className="h-full p-4">
              <Skeleton className="h-full" />
            </div>
          ) : (
            <StaticBlocksRenderer />
          )}
          <div className="h-60"></div>
        </Canvas>
      </Frame>
    </div>
  );
};

export default StaticCanvas;
