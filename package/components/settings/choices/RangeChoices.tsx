import { get, nth } from "lodash";
import { useContext, useMemo } from "react";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { DropDownChoices } from "./DropdownChoices";
import { useCurrentClassByProperty } from "./BlockStyle";
import { CLASSES_LIST } from "../../../constants/CLASSES_LIST";
import { StyleContext } from "./StyleContext";

export const RangeChoices = ({ property, onChange }: any) => {
  const { canReset, canChange } = useContext(StyleContext);
  const currentClass = useCurrentClassByProperty(property);
  const pureClsName = useMemo(() => get(currentClass, "cls", ""), [currentClass]);
  const classes = useMemo(() => get(CLASSES_LIST, `${property}.classes`, [""]), [property]) as Array<string>;

  const index = classes.indexOf(pureClsName) > -1 ? classes.indexOf(pureClsName) : 0;
  const isArbitraryClassUsed = /\[.*\]/g.test(pureClsName);

  return (
    <div className="flex flex-row divide-x divide-solid divide-border rounded border border-border text-xs">
      {isArbitraryClassUsed ? (
        <div className="py-[5px] px-2">{pureClsName}</div>
      ) : (
        <>
          <button
            type="button"
            className="box-border w-2/12 rounded-tl rounded-bl bg-background px-1 text-center hover:bg-bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-600"
            disabled={!canChange && (!canReset || index - 1 < 0)}
            onClick={() => onChange(nth(classes, index - 1), property)}>
            <span className="flex items-center justify-center">
              <MinusIcon className={!canChange && (!canReset || index - 1 < 0) ? "text-gray-500" : "text-white/60"} />
            </span>
          </button>
          <div className="w-8/12 text-center">
            <DropDownChoices label={false} property={property} onChange={onChange} />
          </div>
          <button
            type="button"
            className="w-2/12 rounded-tr rounded-br bg-background px-1 text-center hover:bg-bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-600"
            disabled={!canChange && (!canReset || index + 1 >= classes.length)}
            onClick={() => onChange(nth(classes, index + 1), property)}>
            <span className="flex items-center justify-center">
              <PlusIcon
                className={!canChange && (!canReset || index + 1 >= classes.length) ? "text-gray-500" : "text-white/60"}
              />
            </span>
          </button>
        </>
      )}
    </div>
  );
};
