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
        "group flex w-full items-center justify-between space-x-px py-px ",
        isSelected ? "bg-blue-500 text-white" : "hover:bg-gray-200 dark:hover:bg-gray-800",
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
          className={`flex h-4 w-4 rotate-0 transform cursor-pointer items-center justify-center text-xs transition-transform duration-100 ${
            props.isOpen ? "rotate-90" : ""
          }`}>
          {props.node.droppable && (
            <button onClick={handleToggle} type="button">
              <TriangleRightIcon />
            </button>
          )}
        </div>
        <button type="button" className="flex items-center">
          <div className="-mt-1 h-3 w-3">
            <TypeIcon type={data?._type} />
          </div>
          <div className="ml-2 text-[11px]">{props.node.data?._name || props.node.text}</div>
        </button>
      </div>
    </div>
  );
};
