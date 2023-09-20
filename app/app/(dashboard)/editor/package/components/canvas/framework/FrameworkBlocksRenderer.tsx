import { useAtom } from "jotai";
import { filter, isEmpty } from "lodash";
import { Provider } from "react-wrap-balancer";
import { EmptyCanvas } from "../EmptyCanvas";
import { canvasAllBlocksAtom } from "./store";
import { BlocksRenderer } from "../BlocksRenderer";

export const FrameworkBlocksRenderer = () => {
  const [blocks] = useAtom(canvasAllBlocksAtom);
  return (
    <Provider>
      {!blocks.length ? <EmptyCanvas /> : <BlocksRenderer blocks={filter(blocks, (block) => isEmpty(block._parent))} />}
    </Provider>
  );
};
