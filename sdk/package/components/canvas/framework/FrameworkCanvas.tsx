import React, { useCallback, useEffect, useRef, useState } from "react";
import { each, get, isEmpty } from "lodash";
import postRobot from "post-robot";
import {
  useAllBlocks,
  useBrandingOptions,
  useCanvasWidth,
  useCanvasZoom,
  useDarkMode,
  useDuplicateBlocks,
  useHighlightBlockId,
  useRemoveBlocks,
  useSelectedBlockIds,
} from "@/sdk/package";
import { useSelectedBlock } from "../../../hooks/useSelectedBlockIds";
import { useSelectedStylingBlocks } from "../../../hooks/useSelectedStylingBlocks";
import InsideBuilder from "./InsideBuilder";

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
const FrameworkCanvas = (): React.JSX.Element | null => {
  const [initialised, setInitialised] = useState<boolean>(false);
  const allBlocks = useAllBlocks();
  const [width] = useCanvasWidth();
  const [darkMode] = useDarkMode();
  const [projectSettings] = useBrandingOptions();
  const [ids, setSelectedIds, toggleSelected] = useSelectedBlockIds();
  const [styleBlocks, setSelectedStylingBlocks] = useSelectedStylingBlocks();
  const [highlightedId, highlight] = useHighlightBlockId();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const scale = useCanvasScale(dimension);
  const [initialWidth, setInitialWidth] = useState(0);
  const [, setSelectedElements] = useState<HTMLElement[]>([]);
  const removeBlocks = useRemoveBlocks();
  const duplicateBlocks = useDuplicateBlocks();
  //
  useEffect(() => {
    if (!initialised) return;
    const { clientWidth, clientHeight } = wrapperRef.current as HTMLDivElement;
    setDimension({ width: clientWidth, height: clientHeight });
    if (initialWidth === 0) {
      setInitialWidth(clientWidth);
    }
  }, [wrapperRef, width, initialised, initialWidth]);

  const isInViewport = (element: HTMLElement, offset = 0) => {
    const { top } = element.getBoundingClientRect();
    return top + offset >= 0 && top - offset <= window.innerHeight;
  };

  useEffect(() => {
    if (!iframeRef || isEmpty(ids)) {
      setSelectedElements([]);
      return;
    }
    const iframeD: any = iframeRef.current?.contentDocument;
    const elements: HTMLElement[] = [];
    each(ids, (id: string) => {
      let element: HTMLElement | null = iframeD.getElementById(id);
      if (!element && id) {
        const nodes = iframeD.querySelectorAll(`[data-bid="${id}"]`);
        element = get(nodes, 0, null);
      }
      if (element) {
        elements.push(element);
      }
    });
    if (elements.length === 1 && !isInViewport(elements[0])) {
      iframeRef.current?.contentWindow?.scrollTo({ top: elements[0].offsetTop, behavior: "smooth" });
    }
    setSelectedElements(elements);
  }, [ids]);

  useEffect(() => {
    // @ts-ignore
    const initializeRobot = postRobot.on("initialize", async () => {});

    // @ts-ignore
    const setSelectedRobot = postRobot.on("setSelected", (event) => {
      const blockIds = event.data;
      setSelectedIds(blockIds);
    });

    // @ts-ignore
    const setSelectedStyleRobot = postRobot.on("setSelectedStyle", (event) => {
      const styleBlocksIframe = event.data;
      setSelectedStylingBlocks(styleBlocksIframe);
    });

    // @ts-ignore
    const toggleSelectedRobot = postRobot.on("toggleSelected", (event) => {
      const { id } = event.data;
      toggleSelected(id);
    });

    setInitialised(true);

    return () => {
      initializeRobot.cancel();
      setSelectedRobot.cancel();
      setSelectedStyleRobot.cancel();
      toggleSelectedRobot.cancel();
    };
  }, []);

  useEffect(() => {
    // @ts-ignore
    const duplicateBlockRobot = postRobot.on("duplicateBlock", (event) => {
      const { id, parentId } = event.data;
      duplicateBlocks([id], parentId);
    });

    // @ts-ignore
    const removeBlockRobot = postRobot.on("removeBlock", (event) => {
      const { id } = event.data;
      removeBlocks([id]);
    });

    return () => {
      duplicateBlockRobot.cancel();
      removeBlockRobot.cancel();
    };
  }, [allBlocks]);
  //
  useEffect(() => {
    if (!iframeRef.current?.contentWindow) return;
    postRobot.send(iframeRef.current?.contentWindow, "updateDarkMode", { darkMode });
  }, [darkMode, iframeRef.current?.contentWindow]);

  useEffect(() => {
    if (!iframeRef.current?.contentWindow) return;
    postRobot.send(iframeRef.current?.contentWindow, "updateBlocks", { allBlocks });
  }, [allBlocks, iframeRef.current?.contentWindow]);

  useEffect(() => {
    if (!iframeRef.current?.contentWindow) return;
    postRobot.send(iframeRef.current?.contentWindow, "updateSelectedBlockIds", { ids });
  }, [ids, iframeRef.current?.contentWindow]);

  useEffect(() => {
    if (!iframeRef.current?.contentWindow) return;
    postRobot.send(iframeRef.current?.contentWindow, "updateSelectedStyleIds", { blocks: styleBlocks });
  }, [styleBlocks, iframeRef.current?.contentWindow]);

  const selectedBlock = useSelectedBlock();
  useEffect(() => {
    if (!iframeRef.current?.contentWindow) return;
    postRobot.send(iframeRef.current?.contentWindow, "updateSelectedBlock", { selectedBlock });
  }, [selectedBlock, iframeRef.current?.contentWindow]);

  useEffect(() => {
    if (!iframeRef.current?.contentWindow) return;
    postRobot.send(iframeRef.current?.contentWindow, "updateHighlightedBlockId", { highlightedId });
  }, [highlightedId, iframeRef.current?.contentWindow]);

  useEffect(() => {
    if (!iframeRef.current?.contentWindow) return;
    postRobot.send(iframeRef.current?.contentWindow, "updateProjectSettings", { projectSettings });
  }, [projectSettings, iframeRef.current?.contentWindow]);

  // TODO: Needed for section mode
  // const frameworkPageUrl = useBuilderProp("frameworkPageUrl", "/");

  if (!initialised) {
    return null;
  }

  return (
    <div
      onMouseLeave={() => setTimeout(() => highlight(""), 300)}
      className="relative mx-auto h-full w-full bg-black/80"
      style={initialWidth > 0 && !isEmpty(scale) ? { width: initialWidth } : {}}
      ref={wrapperRef}>
      <InsideBuilder styles={{ width: `${width}px`, ...scale }} model="page" />
      {/* NOTE: iframe would be needed for section support */}
      {/* <iframe
        title="canvas-framework-iframe"
        ref={iframeRef as any}
        id="canvas-iframe"
        style={{ width: `${width}px`, ...scale }}
        className="relative mx-auto box-content h-full max-w-full shadow-md transition-all duration-300 ease-linear"
        src="/"
      /> */}
    </div>
  );
};

export default FrameworkCanvas;
