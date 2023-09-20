import React, { useCallback, useEffect } from "react";
import { useFrame } from "react-frame-component";
import { useAtom } from "jotai";
import { each } from "lodash";
import { canvasSelectedBlockIdsAtom } from "./store";

export const CanvasContainer = ({ children, sendToParent }: { children: React.ReactNode; sendToParent: Function }) => {
  const { document } = useFrame();
  const [ids] = useAtom(canvasSelectedBlockIdsAtom);
  const onClick = useCallback(
    (currentTarget: HTMLElement) => {
      if (currentTarget.getAttribute("data-block-parent")) {
        // check if target element has data-styles-prop attribute
        const styleProp: string | null = currentTarget.getAttribute("data-style-prop");
        const styleId: string | null = currentTarget.getAttribute("data-style-id");
        const blockId: string | null = currentTarget.getAttribute("data-block-parent");
        sendToParent("setSelected", [blockId]);
        sendToParent("setSelectedStyle", [{ id: styleId, prop: styleProp, blockId }]);
      } else if (currentTarget.getAttribute("data-block-id")) {
        sendToParent("setSelected", [currentTarget.getAttribute("data-block-id")]);
        if (currentTarget.getAttribute("data-block-parent")) {
          const styleProp: string | null = currentTarget.getAttribute("data-style-prop");
          const styleId: string | null = currentTarget.getAttribute("data-style-id");
          const blockId: string | null = currentTarget.getAttribute("data-block-parent");
          sendToParent("setSelectedStyle", [{ id: styleId, prop: styleProp, blockId }]);
        }
      }
    },
    [sendToParent]
  );

  useEffect(() => {
    each(ids, (id) => {
      const element = document?.querySelector(`[data-block-id="${id}"]`);
      if (element) {
        // FIXME: Trigger infinte loop
        // @ts-ignore
        // element.click();
      }
    });
  }, [ids, document]);

  useEffect(() => {
    if (!document) return;
    const onClickAnywhere = (event: any) => {
      let currentElement = event.target;

      while (currentElement) {
        if (currentElement.hasAttribute("data-block-id") || currentElement.hasAttribute("data-block-parent")) {
          onClick(currentElement as HTMLElement);
          // Found the element with data-block-id attribute, stop the loop
          break;
        }
        // Move to the parent element
        currentElement = currentElement.parentElement;
      }
    };
    document.addEventListener("click", onClickAnywhere);
    // eslint-disable-next-line consistent-return
    return () => document.removeEventListener("click", onClickAnywhere);
  }, [document, onClick]);

  return (
    <div id="canvas" className="relative max-w-full h-full outline-2">
      {children}
    </div>
  );
};
