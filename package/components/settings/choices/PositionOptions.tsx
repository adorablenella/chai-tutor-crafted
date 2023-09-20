import { useMemo, useState } from "react";
import { get } from "lodash";
import { BlockStyle, useCurrentClassByProperty } from "./BlockStyle";
import { MultipleChoices } from "./MultipleChoices";

export const PositionOptions = () => {
  const currentClass = useCurrentClassByProperty("position");
  const [canChangePosition, setCanChangePosition] = useState(false);
  const pureClsName = useMemo(() => get(currentClass, "cls", ""), [currentClass]);
  return (
    <>
      <BlockStyle
        onEmitChange={(canChange: boolean) => setCanChangePosition(canChange)}
        label="Position"
        property="position"
      />

      {canChangePosition && pureClsName && (
        <MultipleChoices
          borderB
          borderT
          label="Direction"
          negative
          options={[
            { key: "top", label: "Top" },
            { key: "right", label: "Right" },
            { key: "bottom", label: "Bottom" },
            { key: "left", label: "Left" },
          ]}
        />
      )}

      {canChangePosition && ["fixed", "absolute"].includes(pureClsName) && (
        <MultipleChoices
          label="Inset"
          type="advance"
          negative
          options={[
            { key: "inset", label: "All" },
            { key: "insetX", label: "Left Right" },
            { key: "insetY", label: "Top Bottom" },
          ]}
        />
      )}
      <BlockStyle
        onEmitChange={(canChange: boolean) => setCanChangePosition(canChange)}
        label="Z-index"
        type="advance"
        negative
        property="zIndex"
        units={["-", "auto"]}
      />
    </>
  );
};
