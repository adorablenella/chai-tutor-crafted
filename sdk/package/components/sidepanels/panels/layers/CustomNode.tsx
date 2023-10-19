import { NodeModel, useDragOver } from "@minoru/react-dnd-treeview";
import { TriangleRightIcon } from "@radix-ui/react-icons";
import { TypeIcon } from "./TypeIcon";
import { cn } from "../../../../radix/lib/utils";
import { useHiddenBlockIds, useHighlightBlockId } from "../../../../hooks";
import { nth, startsWith } from "lodash";
import { useMemo } from "react";
import { TBlock } from "../../../../types/TBlock";
import { STYLES_KEY } from "../../../../constants/CONTROLS";

type Props = {
  depth: number;
  isOpen: boolean;
  isSelected: boolean;
  node: NodeModel<any>;
  onSelect: Function;
  onToggle: (id: NodeModel["id"]) => void;
  toggleIds: Function;
};

function getShowOnMediaQueryMessage(classes = "") {
  const MEDIA_QUERIES = {
    xs: "390px",
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1366px",
    "2xl": "1536px",
  };
  let srOnlyRegEx = new RegExp(/\bsr-only\b/);
  if (srOnlyRegEx.test(classes)) return "Sr Only";
  // matches sm:hidden, md:hidden, lg:hidden, xl:hidden, 2xl:hidden
  let showOnMobileRegEx = new RegExp(/\b(sm|md|lg|xl|2xl):hidden\b/);
  if (showOnMobileRegEx.test(classes)) return "Visible on mobile";

  //check if it has a hidden class
  if (classes.match(/(^| )hidden( |$)/g)) {
    let showOnMqRegEx = new RegExp(
      // checks if any of the display property is set for any higher media query
      /\b(sm|md|lg|xl|2xl):(block|grid|flex|inline|inline-grid|inline-flex|inline-block)\b/,
    );
    let showOn = classes.match(showOnMqRegEx);
    if (nth(showOn, 1)) {
      // @ts-ignore
      return `Visible >=${MEDIA_QUERIES[nth(showOn, 1)]}`;
    }
  }
  return "";
}

const getBlocksClasses = (data: TBlock) => {
  let classes = "";
  Object.keys(data).forEach((key) => {
    if (startsWith(data[key], STYLES_KEY)) {
      classes = data[key];
    }
  });
  return classes;
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

  const showOnMessage = useMemo(() => {
    const classes = getBlocksClasses(props.node.data);
    return getShowOnMediaQueryMessage(classes);
  }, [props.node.data]);

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
          {showOnMessage ? (
            <span
              className={
                "ml-2 flex items-center text-[10px] italic " + (isSelected ? "text-gray-200" : "text-gray-500")
              }>
              ({showOnMessage})
            </span>
          ) : null}
        </button>
      </div>
    </div>
  );
};
