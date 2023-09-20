import { get, map, startCase, toLower } from "lodash";
import React, { useContext, useMemo } from "react";
import { BoxIcon } from "@radix-ui/react-icons";
import { EDITOR_ICONS } from "../../../constants/ICONS";
import { useCurrentClassByProperty } from "./BlockStyle";
import { CLASSES_LIST } from "../../../constants/CLASSES_LIST";
import { StyleContext } from "./StyleContext";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../../radix-ui";

export const IconChoices = ({ property, onChange }: any) => {
  const classes = useMemo(() => get(CLASSES_LIST, `${property}.classes`, [""]), [property]);
  const { canChange } = useContext(StyleContext);
  const currentClass = useCurrentClassByProperty(property);
  const pureClsName = useMemo(() => get(currentClass, "cls", ""), [currentClass]);

  return (
    <div className="flex grow flex-wrap gap-1">
      {map(classes, (cls) => (
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              disabled={!canChange}
              onClick={() => onChange(cls, property)}
              className={`cursor-pointer rounded border border-gray-600 p-1 disabled:cursor-not-allowed  ${
                pureClsName === cls ? " bg-blue-500 text-white" : "disabled:bg-gray-600 disabled:text-gray-400"
              }`}>
              {React.createElement(get(EDITOR_ICONS, cls, BoxIcon))}
            </button>
          </TooltipTrigger>
          <TooltipContent>{startCase(toLower(cls))}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
};
