import * as React from "react";
import { useState } from "react";
import { filter, forEach, get, isEmpty, last, map, set } from "lodash";
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
  canDelete,
  onChange,
  onRemove,
}: {
  item: { key: string; value: string };
  index: number;
  canDelete: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, i: number) => void;
  onRemove: () => void;
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
        <input
          name="value"
          onChange={(e) => (isEmpty(item.key) ? {} : onChange(e, index))}
          value={item.value}
          placeholder="Value"
          className="w-full rounded border-gray-300 bg-background p-0.5 pl-2 text-sm focus-visible:outline-0"
          autoComplete="off"
          autoCapitalize="off"
        />
        <TrashIcon
          onClick={onRemove}
          className="h-6 w-6 cursor-pointer rounded border border-red-400 p-1 text-red-400 hover:opacity-80"
        />
      </div>
    </div>
  );
};

export const CustomAttributes = ({ section }: any) => {
  const { setSyncState } = useSavePage();
  const block = useSelectedBlock();
  const [attributes, setAttributes] = useState([] as Array<{ key: string; value: string }>);
  const [selectedStylingBlock] = useSelectedStylingBlocks();
  const updateBlockPropsRealtime = useUpdateBlocksPropsRealtime();

  const attrKey = `${get(selectedStylingBlock, "0.prop")}_attrs`;

  React.useEffect(() => {
    const _attributes = map(get(block, attrKey), (value, key) => ({ key, value }));
    if (!isEmpty(_attributes)) setAttributes(_attributes as any);
    else setAttributes([]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [get(block, attrKey)]);

  const addAttribute = () => setAttributes([...attributes, { key: "", value: "" }]);
  const removeAttribute = (index: number) => {
    const _attributes = filter(attributes, (_, ind) => index !== ind);
    updateAttributes(_attributes);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
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
        <div className="no-scrollbar flex min-h-max flex-col gap-y-2 overflow-y-auto bg-gray-100 p-px">
          <Label className="mt-2 flex w-full items-center justify-between">
            Add Custom attributes
            <div
              className={`flex h-6 w-max items-center justify-center gap-x-0.5 rounded-full border p-1 px-2 text-xs ${
                !isEmpty(attributes) && isEmpty(last(attributes)?.key)
                  ? "cursor-not-allowed border-gray-400 text-gray-400"
                  : "cursor-pointer border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
              }`}
              onClick={() => {
                if (!isEmpty(attributes) && isEmpty(last(attributes)?.key)) return;
                addAttribute();
              }}>
              <PlusIcon width={12} height={12} /> Add
            </div>
          </Label>
          <div className="flex flex-col">
            {isEmpty(attributes) && (
              <div className="flex h-12 items-center justify-center text-sm text-gray-400">
                Click + Add to add attributes
              </div>
            )}
            {React.Children.toArray(
              map(attributes, (item: { key: string; value: string }, index) => {
                const isDisabledAdd = isEmpty(item.key) || isEmpty(item.value);
                const canDelete = attributes.length > 0 && index < attributes.length - 1;
                return (
                  <NewAttributePair
                    item={item}
                    index={index}
                    canDelete={canDelete}
                    onChange={onChange}
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
