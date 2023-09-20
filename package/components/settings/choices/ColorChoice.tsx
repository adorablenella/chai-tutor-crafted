import { get } from "lodash";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useCurrentClassByProperty } from "./BlockStyle";
import { DropDown } from "./DropdownChoices";
import { CLASSES_LIST } from "../../../constants/CLASSES_LIST";
import { StyleContext } from "./StyleContext";

export const COLOR_PROP = {
  backgroundColor: "bg",
  textColor: "text",
  borderColor: "border",
  boxShadowColor: "shadow",
  outlineColor: "outline",
  divideColor: "divide",
  fromColor: "from",
  viaColor: "via",
  toColor: "to",
  ringColor: "ring",
  ringOffsetColor: "ring-offset",
};

export const ColorChoice = ({ property, onChange }: any) => {
  const currentClass = useCurrentClassByProperty(property);
  const pureClsName = useMemo(() => get(currentClass, "cls", ""), [currentClass]);

  const { canChange } = useContext(StyleContext);
  const [shades, setShades] = useState<Array<string>>([]);
  const [newColor, setNewColor] = useState<{ color: string; shade?: string }>({ color: "", shade: "" });
  const colors = pureClsName.split("-");
  const color = get(colors, "1", "");
  const shade = get(colors, "2", "");

  const onColorChange = useCallback(
    // eslint-disable-next-line no-shadow
    (color: string) => {
      if (["current", "inherit", "transparent", "black", "white"].includes(color)) {
        setShades([]);
        setNewColor({ color });
      } else {
        setShades(["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"]);
        setNewColor((oldColor) => ({ ...oldColor, ...{ color, shade: oldColor.shade ? oldColor.shade : "500" } }));
      }
    },
    [setShades, setNewColor]
  );

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (["current", "inherit", "transparent", "black", "white"].includes(color)) {
      return setShades([]);
    }
    setShades(["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"]);
  }, [color]);

  const onChangeShade = useCallback(
    // eslint-disable-next-line no-shadow
    (shade: string) => {
      setNewColor({ color, ...{ shade } });
    },
    [color]
  );

  useEffect(() => {
    setNewColor({ color: "", shade: "" });
  }, [currentClass]);

  useEffect(() => {
    const prop = get(COLOR_PROP, property, "");
    const cls = `${prop}-${newColor.color}${newColor.shade ? `-${newColor.shade}` : ""}`;
    if (cls.match(new RegExp(get(CLASSES_LIST, `${property}.regExp`, "") as string))) {
      onChange(cls, property);
    }
  }, [newColor, onChange, property]);

  return (
    <div className="flex flex-row divide-x divide-solid divide-border rounded-lg border border-border text-xs">
      <div className="grow text-center">
        <DropDown
          disabled={!canChange}
          rounded
          selected={color}
          onChange={onColorChange}
          options={[
            "current",
            "transparent",
            "primary",
            "secondary",
            "black",
            "white",
            "slate",
            "gray",
            "zinc",
            "neutral",
            "stone",
            "red",
            "orange",
            "amber",
            "yellow",
            "lime",
            "green",
            "emerald",
            "teal",
            "cyan",
            "sky",
            "blue",
            "indigo",
            "violet",
            "purple",
            "fuchsia",
            "pink",
            "rose",
          ]}
        />
      </div>
      <button type="button" className="grow text-center">
        <DropDown rounded selected={shade} disabled={!color || !canChange} onChange={onChangeShade} options={shades} />
      </button>
    </div>
  );
};
