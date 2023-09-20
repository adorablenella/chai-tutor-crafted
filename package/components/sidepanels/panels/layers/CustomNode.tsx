import { NodeModel, useDragOver } from "@minoru/react-dnd-treeview";
import { TriangleRightIcon } from "@radix-ui/react-icons";
import { TypeIcon } from "./TypeIcon";
import { cn } from "../../../../radix/lib/utils";
import { useHiddenBlockIds, useHighlightBlockId } from "../../../../hooks";

type Props = {
  depth: number;
  isOpen: boolean;
  isSelected: boolean;
  node: NodeModel<any>;
  onSelect: Function;
  onToggle: (id: NodeModel["id"]) => void;
  toggleIds: Function;
};

export const CustomNode = (props: Props) => {
  const [, setHighlighted] = useHighlightBlockId();
  const [hiddenBlockIds] = useHiddenBlockIds();
  const { isSelected } = props;
  const { id, data } = props.node;
  const indent = props.depth * 10;

  const handleToggle = (e: any) => {
    e.stopPropagation();
    props.onToggle(props.node.id);
  };

  const dragOverProps = useDragOver(id, props.isOpen, props.onToggle);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      onMouseEnter={() => setHighlighted(id)}
      className={cn(
        "flex w-full items-center group space-x-px py-px justify-between ",
        isSelected ? "bg-blue-500 text-white" : "hover:bg-gray-100 dark:hover:bg-gray-800"
      )}
      onClick={(evt) => {
        evt.stopPropagation();
        if (hiddenBlockIds.includes(id as string)) {
          return;
        }
        props.onSelect(id);
      }}
      onContextMenu={() => props.onSelect(id)}
      style={{ paddingInlineStart: indent }}
      {...dragOverProps}>
      <div className="flex items-center">
        <div
          className={`flex items-center justify-center w-4 h-4 text-xs cursor-pointer transform rotate-0 transition-transform duration-100 ${
            props.isOpen ? "rotate-90" : ""
          }`}>
          {props.node.droppable && (
            <button onClick={handleToggle} type="button">
              <TriangleRightIcon />
            </button>
          )}
        </div>
        <button type="button" className="flex items-center">
          <div className="h-3 w-3 -mt-1">
            <TypeIcon type={data?._type} />
          </div>
          <div className="text-[11px] ml-2">{props.node.data?._name || props.node.text}</div>
        </button>
      </div>
    </div>
  );
};
