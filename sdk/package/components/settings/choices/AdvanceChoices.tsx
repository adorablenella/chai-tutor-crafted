import { useCallback, useContext, useEffect, useState } from "react";
import { get, isEmpty, isNaN, parseInt } from "lodash";
import { useThrottledCallback } from "@react-hookz/web";
import { InfoCircledIcon, RowSpacingIcon, TriangleDownIcon } from "@radix-ui/react-icons";
import { getUserInputValues } from "../../../functions/GetUserInputValues";
import { Button, Tooltip, TooltipContent, TooltipTrigger } from "../../../radix-ui";
import { getClassValueAndUnit } from "../../../styling/Helpers";
import { BlockSettingsContext } from "../SettingsContext";

type RangeOptionsType = {
  classPrefix: string;
  cssProperty?: string;
  currentClass: string;
  negative: boolean;
  onChange: Function;
  // eslint-disable-next-line react/no-unused-prop-types
  onSetStyle?: Function;
  // eslint-disable-next-line react/no-unused-prop-types
  presetClasses?: {
    [key: string]: { [label: string | number]: string | number };
  };
  // eslint-disable-next-line react/no-unused-prop-types
  ranges?: {
    [key: string]: { max: number; min: number; step: number };
  };
  units: string[];
};

const DragStyleButton = ({
  unit,
  currentValue,
  onDrag,
  onDragEnd,
  onDragStart,
  negative,
  cssProperty,
}: {
  cssProperty: string;
  currentValue: number | string;
  negative: boolean;
  onDrag: Function;
  onDragEnd: Function;
  onDragStart: Function;
  unit: string;
}) => {
  const { setDragData } = useContext(BlockSettingsContext);
  return (
    <button
      type="button"
      onMouseDown={(e: any) => {
        const data = {
          onDrag,
          onDragEnd,
          dragging: true,
          dragStartY: e.pageY,
          dragStartValue: `${currentValue}`,
          dragUnit: unit,
          negative,
          cssProperty,
        };
        onDragStart(data);
        setDragData(data);
      }}
      color={undefined}
      className="relative z-50 ml-1 hidden h-6 cursor-row-resize rounded bg-background/70 px-2 group-hover:inline">
      <RowSpacingIcon />
    </button>
  );
};

const UnitSelection = ({ onSelect, current, units }: { current: string; onSelect: Function; units: string[] }) => (
  <div data-theme="light" className="-m-[7px] -mx-[13px] flex w-9 flex-col">
    {units.map((unit: string) => (
      <Button
        className="h-max rounded-none px-1 py-1 text-right text-[11px] hover:bg-blue-400"
        key={unit}
        color={current === unit ? "primary" : undefined}
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          onSelect(unit);
        }}>
        {unit}
      </Button>
    ))}
  </div>
);

export const AdvanceChoices = (props: RangeOptionsType) => {
  const [showUnits, setShowUnits] = useState(false);
  const [value, setValue] = useState<number | string>("");
  const { currentClass, onChange, classPrefix, cssProperty, units, negative } = props;
  const [unit, setUnit] = useState(cssProperty?.toLowerCase().includes("width") ? "%" : units[0]); // get the current un
  const [error, setError] = useState(false);
  const [draggedVal, setDraggedVal] = useState<number | string>("");
  const [lift, setLift] = useState(false);
  const [keyDown, setKeyDown] = useState(false);

  useEffect(() => {
    const { value: newValue, unit: newUnit } = getClassValueAndUnit(currentClass);
    if (newUnit === "") {
      setValue(newValue);
      setUnit(cssProperty?.toLowerCase().includes("width") ? "%" : units[0]);
      return;
    }
    setUnit(newUnit);
    if (newUnit === "class") {
      setValue("");
    } else {
      setValue(!isEmpty(newValue) ? newValue : "");
    }
  }, [currentClass, cssProperty, units]);

  const emitOnChange = useThrottledCallback(
    (cls: string) => {
      onChange(cls);
    },
    [onChange],
    200,
  );

  const emitOnDrag = useThrottledCallback(
    (cls: string) => {
      onChange(cls, false);
    },
    [onChange],
    200,
  );

  const setStyle = useCallback(
    (realtime = false) => {
      const values = getUserInputValues(`${value}`, units);
      if (get(values, "error", false)) {
        setError(true);
        return;
      }
      const tempUnit = get(values, "unit") !== "" ? get(values, "unit") : unit;
      if (tempUnit === "auto" || tempUnit === "none") {
        emitOnChange(`${classPrefix}${tempUnit}`);
        return;
      }
      if (get(values, "value") === "") {
        return;
      }
      const isNegative = get(values, "value", "").startsWith("-") ? "-" : "";
      const cls: string = `${isNegative}${classPrefix}[${get(values, "value", "").replace("-", "")}${
        tempUnit === "-" ? "" : tempUnit
      }]`;
      if (realtime) {
        emitOnDrag(cls);
      } else {
        emitOnChange(cls);
      }
    },
    [emitOnChange, emitOnDrag, value, unit, classPrefix, units],
  );

  const setStyleForUnit = useCallback(
    (localUnit: string) => {
      const values = getUserInputValues(`${value}`, units);
      if (get(values, "error", false)) {
        setError(true);
        return;
      }

      if (localUnit === "auto" || localUnit === "none") {
        emitOnChange(`${classPrefix}${localUnit}`);
        return;
      }
      if (get(values, "value") === "") {
        return;
      }
      const tempUnit = get(values, "unit") !== "" ? get(values, "unit") : localUnit;
      const isNegative = get(values, "value", "").startsWith("-") ? "-" : "";
      const cls: string = `${isNegative}${classPrefix}[${get(values, "value", "").replace("-", "")}${
        tempUnit === "-" ? "" : tempUnit
      }]`;
      emitOnChange(cls);
    },
    [emitOnChange, value, classPrefix, units],
  );

  return (
    <div className="flex w-full flex-col">
      <div className="flex items-center justify-start">
        {unit === "class" ? (
          <>
            <input className="w-20 rounded py-1" readOnly value={currentClass} />
            <Tooltip>
              <TooltipTrigger asChild>
                <button type="button" className="invisible ml-3 mt-1 text-blue-600 group-hover:visible">
                  <InfoCircledIcon />
                </button>
              </TooltipTrigger>
              <TooltipContent>Current value is using a Tailwind preset class.</TooltipContent>
            </Tooltip>
          </>
        ) : (
          <div className={`group relative  flex items-center ${lift ? "z-auto" : ""}`}>
            <div className="flex items-center rounded-md border border-border">
              {["none", "auto"].indexOf(unit) !== -1 ? null : (
                <input
                  readOnly={unit === "class"}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      setStyle();
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.keyCode !== 38 && e.keyCode !== 40) {
                      return;
                    }
                    e.preventDefault();
                    setKeyDown(true);
                    // @ts-ignore
                    const num: number = parseInt(e.target.value as string);
                    let inputValue = isNaN(num) ? 0 : num;
                    if (e.keyCode === 38) {
                      inputValue += 1;
                    }
                    if (e.keyCode === 40) {
                      inputValue -= 1;
                    }
                    const val = `${inputValue}`;
                    const isNegative = val.startsWith("-") ? "-" : "";
                    const cls: string = `${isNegative}${classPrefix}[${val.replace("-", "")}${
                      unit === "-" ? "" : unit
                    }]`;
                    emitOnDrag(cls);
                  }}
                  onKeyUp={(e) => {
                    if (keyDown) {
                      e.preventDefault();
                      // debouncedCallback();
                      setKeyDown(false);
                    }
                  }}
                  onBlur={() => setStyle()}
                  onChange={(e) => {
                    setError(false);
                    setValue(e.target.value);
                  }}
                  onClick={(event) => {
                    // @ts-ignore
                    event?.target?.select();
                    setShowUnits(false);
                  }}
                  value={lift ? draggedVal : value}
                  className={"h-6 w-14 rounded rounded-r-none bg-background pl-2 text-sm focus-visible:outline-0 ".concat(
                    " ",
                    error ? "border-red-500 text-red-500" : "border-foreground/20",
                  )}
                />
              )}
              <Tooltip open={showUnits} delayDuration={100}>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={() => setShowUnits(!showUnits)}
                    className="flex h-6 cursor-pointer items-center gap-x-1 rounded rounded-l-none bg-background p-px px-1 text-[11px] uppercase">
                    <span className={`inline-block ${units.length === 1 ? "px-2 font-semibold" : ""}`}>{unit}</span>
                    {units.length > 1 ? <TriangleDownIcon /> : null}
                  </button>
                </TooltipTrigger>
                <TooltipContent className="bg-background">
                  <UnitSelection
                    units={units}
                    current={unit}
                    onSelect={(val: string) => {
                      setShowUnits(false);
                      setUnit(val);
                      setStyleForUnit(val);
                    }}
                  />
                </TooltipContent>
              </Tooltip>
            </div>
            {["none", "auto"].indexOf(unit) !== -1 || lift ? null : (
              <DragStyleButton
                onDragStart={() => setLift(true)}
                onDragEnd={(draggedValue: string) => {
                  setDraggedVal(() => "");
                  setLift(false);
                  if (isEmpty(draggedValue)) {
                    return;
                  }

                  const val = `${draggedValue}`;
                  const isNegative = val.startsWith("-") ? "-" : "";
                  const cls: string = `${isNegative}${classPrefix}[${val.replace("-", "")}${unit === "-" ? "" : unit}]`;
                  emitOnChange(cls);
                }}
                onDrag={(v: string) => {
                  if (isEmpty(v)) {
                    return;
                  }
                  setDraggedVal(v);
                  const val = `${v}`;
                  const isNegative = val.startsWith("-") ? "-" : "";
                  const cls: string = `${isNegative}${classPrefix}[${val.replace("-", "")}${unit === "-" ? "" : unit}]`;
                  emitOnDrag(cls);
                }}
                currentValue={value}
                unit={unit}
                negative={negative}
                cssProperty={cssProperty as string}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
