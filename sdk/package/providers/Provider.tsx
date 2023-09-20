// import { createDragDropManager } from 'dnd-core';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// const DNDManager = createDragDropManager(HTML5Backend);
const GlobalDndContext = (props: any) => (
  // const manager = useRef(DNDManager);
  // the following line solve the problem only with key property
  <DndProvider backend={HTML5Backend} key={1}>
    {props.children}
  </DndProvider>
);
export { GlobalDndContext };
