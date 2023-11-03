import * as React from "react";
import { useState } from "react";
import { filter, forEach, get, isEmpty, map, set } from "lodash";
import { PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { useSelectedBlock } from "../../../hooks/useSelectedBlockIds";
import { Label } from "../../../radix/components/ui/label";
import { useUpdateBlocksPropsRealtime } from "../../../hooks/useUpdateBlocksProps";
import { AccordionContent, AccordionItem, AccordionTrigger } from "../../../radix-ui";
import { useSavePage } from "../../../hooks/useSavePage";
import { useSelectedStylingBlocks } from "../../../hooks/useSelectedStylingBlocks";

const NewAttributePair = ({
  item,
  index,
  isDisabledAdd,
  canDelete,
  onChange,
  onRemove,
  onAdd,
}: {
  item: { key: string; value: string };
  index: number;
  canDelete: boolean;
  isDisabledAdd: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, i: number) => void;
  onRemove: () => void;
  onAdd: () => void;
}) => {
  return (
    <div className={`flex flex-col gap-1 border-gray-400 py-2 ${canDelete ? "border-b" : ""}`}>
      <input
        name="key"
        onChange={(e) => onChange(e, index)}
        value={item.key}
        placeholder="Key"
        className="w-full rounded border-gray-300 bg-background p-0.5 pl-2 text-sm focus-visible:outline-0"
        autoComplete="off"
        autoCapitalize="off"
      />
      <div className="flex items-center gap-x-1.5">
        <textarea
          rows={1}
          name="value"
          onChange={(e) => (isEmpty(item.key) ? {} : onChange(e, index))}
          value={item.value}
          placeholder="Value"
          className="w-full rounded border-gray-300 bg-background p-0.5 pl-2 text-sm focus-visible:outline-0"
          autoComplete="off"
          autoCapitalize="off"
        />
        {canDelete && (
          <TrashIcon
            onClick={onRemove}
            className="h-6 w-6 cursor-pointer rounded border border-red-400 p-1 text-red-400 hover:opacity-80"
          />
        )}
        {!canDelete && (
          <PlusIcon
            strokeWidth={7}
            onClick={() => {
              if (isDisabledAdd) return;
              onAdd();
            }}
            className={`h-6 w-6 rounded border p-1 hover:opacity-80 ${
              isDisabledAdd
                ? "cursor-not-allowed border-gray-400 text-gray-400"
                : "cursor-pointer border-blue-400 text-blue-400"
            }`}
          />
        )}
      </div>
    </div>
  );
};

export const CustomAttributes = ({ section }: any) => {
  const { setSyncState } = useSavePage();
  const block = useSelectedBlock();
  const [attributes, setAttributes] = useState([{ key: "", value: "" }]);
  const [selectedStylingBlock] = useSelectedStylingBlocks();
  const updateBlockPropsRealtime = useUpdateBlocksPropsRealtime();

  const attrKey = `${get(selectedStylingBlock, "0.prop")}_attrs`;

  React.useEffect(() => {
    const _attributes = map(get(block, attrKey), (value, key) => ({ key, value }));
    if (!isEmpty(_attributes)) setAttributes(_attributes as any);
    else setAttributes([{ key: "", value: "" }]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [get(block, attrKey)]);

  const addAttribute = () => setAttributes([...attributes, { key: "", value: "" }]);
  const removeAttribute = (index: number) => {
    const _attributes = filter(attributes, (_, ind) => index !== ind);
    updateAttributes(_attributes);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const _attrs: any = [...attributes];
    _attrs[index][e.target.name] = e.target.value;
    updateAttributes(_attrs);
  };

  const updateAttributes = React.useCallback(
    (updatedAttributes: any = []) => {
      const _attrs = {};
      forEach(updatedAttributes, (item) => {
        if (!isEmpty(item.key)) {
          set(_attrs, item.key, item.value);
        }
      });
      updateBlockPropsRealtime([get(block, "_id")], { [attrKey]: _attrs });
      setSyncState("UNSAVED");
    },
    [block, setSyncState, updateBlockPropsRealtime, attrKey],
  );

  return (
    <AccordionItem value={section.heading}>
      <AccordionTrigger className="px-3 py-2 text-xs hover:no-underline">
        <div className="flex items-center gap-x-2">
          <div
            className={`h-[8px] w-[8px] rounded-full ${!isEmpty(get(block, attrKey)) ? "bg-blue-500" : "bg-gray-300"}`}
          />
          Attributes
        </div>
      </AccordionTrigger>
      <AccordionContent className="bg-gray-100 px-3.5 py-2">
        <div className="no-scrollbar flex min-h-[300px] flex-col gap-y-2 overflow-y-auto bg-gray-100 p-px">
          <Label className="mt-2">Add Custom attributes</Label>
          <div className="flex flex-col">
            {React.Children.toArray(
              map(attributes, (item: { key: string; value: string }, index) => {
                const isDisabledAdd = isEmpty(item.key) || isEmpty(item.value);
                const canDelete = attributes.length > 0 && index < attributes.length - 1;
                return (
                  <NewAttributePair
                    item={item}
                    index={index}
                    isDisabledAdd={isDisabledAdd}
                    canDelete={canDelete}
                    onChange={onChange}
                    onAdd={addAttribute}
                    onRemove={() => removeAttribute(index)}
                  />
                );
              }),
            )}
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
