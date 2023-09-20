import { get } from "lodash";
import React, { useContext, useMemo } from "react";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { CLASSES_LIST } from "../../../constants/CLASSES_LIST";
import { useCurrentClassByProperty } from "./BlockStyle";
import { StyleContext } from "./StyleContext";
import { Input, Tooltip, TooltipContent, TooltipTrigger } from "../../../radix-ui";
import { useCanvasHistory } from "../../../hooks";

export const DropDownChoices = ({ label, property, onChange }: any) => {
  const classes = useMemo(() => get(CLASSES_LIST, `${property}.classes`, [""]), [property]);
  const currentClass = useCurrentClassByProperty(property);
  const pureClsName = useMemo(() => get(currentClass, "cls", ""), [currentClass]);
  const { canChange } = useContext(StyleContext);
  const isArbitraryClassUsed = /\[.*\]/g.test(pureClsName);
  return (
    <div className={label ? "w-full rounded " : "grow"}>
      {isArbitraryClassUsed ? (
        <div className="flex items-center">
          <Input className="w-[70%] rounded py-1" readOnly value={pureClsName} />
          <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
              <button type="button" className="invisible ml-3 mt-1 text-blue-600 group-hover:visible">
                <InfoCircledIcon />
              </button>
            </TooltipTrigger>
            <TooltipContent>Current value is using a Tailwind arbitrary value.</TooltipContent>
          </Tooltip>
        </div>
      ) : (
        <DropDown
          rounded={label}
          onChange={(newClsName: string) => onChange(newClsName, property)}
          selected={pureClsName}
          options={classes}
          disabled={!canChange}
        />
      )}
    </div>
  );
};

export function DropDown({ selected, onChange, rounded = false, options, disabled = false }: any) {
  const currentClassName = selected.replace(/.*:/g, "").trim();
  const { undo, redo } = useCanvasHistory();

  return (
    <select
      disabled={!options.length || disabled}
      className={`${
        rounded ? "rounded-md border border-border" : "border-0"
      } w-full disable:bg-gray-500 h-full truncate rounded bg-background px-2 py-1 text-xs outline-none disabled:cursor-not-allowed`}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(evt) => {
        if (evt.ctrlKey) {
          if (evt.key === "z") undo();
          if (evt.key === "y") {
            redo();
          }
        }
      }}
      value={currentClassName}>
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <option className="bg-transparent" value="" />
      {React.Children.toArray(
        options.map((clsName: string) => (
          <option className="bg-transparent" value={clsName}>
            {clsName}
          </option>
        ))
      )}
    </select>
  );
}
