import * as React from "react";
import { useState } from "react";
import { first, get, isEmpty, map, reject } from "lodash";
// @ts-ignore
import Autosuggest from "react-autosuggest";
import Fuse from "fuse.js";
import { Cross2Icon, PlusIcon } from "@radix-ui/react-icons";
import { ALL_TW_CLASSES } from "../../../constants/CLASSES_LIST";
import { useAddClassesToBlocks, useRemoveClassesFromBlocks } from "../../../hooks";
import { useSelectedBlock, useSelectedBlockIds } from "../../../hooks/useSelectedBlockIds";
import { Button } from "../../../radix/components/ui/button";
import { Label } from "../../../radix/components/ui/label";
import { useSelectedStylingBlocks } from "../../../hooks/useSelectedStylingBlocks";
import { STYLES_KEY } from "../../../constants/CONTROLS";

const fuse = new Fuse(ALL_TW_CLASSES, {
  isCaseSensitive: false,
  threshold: 0.2,
  minMatchCharLength: 2,
  keys: ["name"],
});

export function ManualClasses() {
  const [styleBlock] = useSelectedStylingBlocks();
  const block = useSelectedBlock();
  const addClassesToBlocks = useAddClassesToBlocks();
  const removeClassesFromBlocks = useRemoveClassesFromBlocks();
  const [selectedIds] = useSelectedBlockIds();
  const [newCls, setNewCls] = useState("");
  const prop = first(styleBlock)?.prop as string;
  const classes = reject((get(block, prop, "").replace(STYLES_KEY, "").split(",").pop() || "").split(" "), isEmpty);
  const addNewClasses = () => {
    const fullClsNames: string[] = newCls
      .trim()
      .toLowerCase()
      .replace(/ +(?= )/g, "")
      .split(" ");

    addClassesToBlocks(selectedIds, fullClsNames, true);
    setNewCls("");
  };

  const [suggestions, setSuggestions] = useState<any[]>([]);

  const handleSuggestionsFetchRequested = ({ value }: any) => {
    const search = value.trim().toLowerCase();
    const matches = search.match(/.+:/g);
    let classMatches = [];
    if (matches && matches.length > 0) {
      const [prefix] = matches;
      const searchWithoutPrefix = search.replace(prefix, "");
      const fuseResults = fuse.search(searchWithoutPrefix);
      classMatches = fuseResults.map((result) => ({
        ...result,
        item: { ...result.item, name: prefix + result.item.name },
      }));
    } else {
      classMatches = fuse.search(search);
    }
    setSuggestions(map(classMatches, "item"));
  };

  const handleSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = (suggestion: any) => suggestion.name;

  const renderSuggestion = (suggestion: any) => <div className="rounded-md p-1">{suggestion.name}</div>;

  const inputProps = {
    autoComplete: "off",
    autoCorrect: "off",
    autoCapitalize: "off",
    spellCheck: false,
    placeholder: "Enter class name",
    value: newCls,
    onKeyDown: (e: any) => {
      if (e.key === "Enter" && newCls.trim() !== "") {
        addNewClasses();
      }
    },
    onChange: (_e: any, { newValue }: any) => setNewCls(newValue),
    className: "w-full rounded-md text-xs px-2 hover:outline-0 bg-background border-border py-1",
  };

  return (
    <div
      className={`no-scrollbar flex ${
        suggestions.length > 0 ? "min-h-[300px]" : "min-h-max"
      } w-full flex-col gap-y-5 overflow-y-auto bg-gray-100 px-px`}>
      <Label className="mt-2">Add Tailwind classes</Label>
      <div className="relative -mt-4 flex items-center gap-x-3">
        <div className="relative flex w-full items-center gap-x-3">
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
            onSuggestionsClearRequested={handleSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
            containerProps={{
              className: "relative h-8 w-full gap-y-1 py-1 border-gray-600",
            }}
            theme={{
              suggestion: "bg-transparent",
              suggestionHighlighted: "bg-gray-700 ",
              suggestionsContainerOpen:
                "absolute bg-gray-100 z-50 max-h-[230px] overflow-y-auto w-full  border border-gray-600 rounded-md",
            }}
          />
        </div>
        <Button
          variant="outline"
          className="h-6 border-gray-700"
          onClick={addNewClasses}
          disabled={newCls.trim() === ""}
          size="sm">
          <PlusIcon />
        </Button>
      </div>
      <div className="flex w-full flex-wrap gap-2">
        {isEmpty(classes) && (
          <div className="flex h-10 w-full items-center justify-center text-center text-sm text-gray-400">
            No class added
          </div>
        )}
        {React.Children.toArray(
          classes.map((cls: string) => (
            <div
              key={cls}
              className="group relative flex cursor-default items-center gap-x-1 rounded-full border border-blue-600 bg-blue-500 p-px px-1.5 text-[11px] text-white hover:border-blue-900">
              {cls}
              <Cross2Icon
                onClick={() => removeClassesFromBlocks(selectedIds, [cls])}
                className="invisible absolute right-1 hover:text-white group-hover:visible group-hover:cursor-pointer"
              />
            </div>
          )),
        )}
      </div>
    </div>
  );
}
