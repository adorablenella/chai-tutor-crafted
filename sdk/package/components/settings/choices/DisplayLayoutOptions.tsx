import React, { useMemo } from "react";
import { get } from "lodash";
import { BlockStyle, useCurrentClassByProperty } from "./BlockStyle";
import { MultipleChoices } from "./MultipleChoices";

export const DisplayLayoutOptions = () => {
  const currentClass = useCurrentClassByProperty("display");
  const [canChangeDisplay, setCanChangeDisplay] = React.useState(false);
  const pureClsName = useMemo(() => get(currentClass, "cls", ""), [currentClass]);
  return (
    <>
      <BlockStyle
        onEmitChange={(canChange: boolean) => setCanChangeDisplay(canChange)}
        type="dropdown"
        label="Display"
        property="display"
      />
      {canChangeDisplay && pureClsName.indexOf("flex") !== -1 && (
        <>
          <BlockStyle type="dropdown" label="Direction" property="flexDirection" />
          <BlockStyle type="dropdown" label="Wrap" property="flexWrap" />
          <BlockStyle type="dropdown" label="Justify " property="justifyContent" />
          <BlockStyle type="dropdown" label="Align Content" property="alignContent" />
          <BlockStyle type="dropdown" label="Align Items" property="alignItems" />
          <MultipleChoices
            borderT
            borderB
            label="Gap "
            options={[
              { key: "gap", label: "All" },
              { key: "gapX", label: "Left-Right" },
              { key: "gapY", label: "Top-Bottom" },
            ]}
          />
        </>
      )}

      {canChangeDisplay && pureClsName.indexOf("grid") !== -1 && (
        <>
          <BlockStyle type="range" label="Columns" property="gridColumns" />
          <BlockStyle type="range" label="Rows" property="gridRows" />
          <BlockStyle type="dropdown" label="Auto Flow " property="gridFlow" />
          <BlockStyle type="dropdown" label="Auto Columns" property="gridAutoColumns" />
          <BlockStyle type="dropdown" label="Auto Rows" property="gridAutoRows" />
          <MultipleChoices
            borderT
            borderB
            label="Gap "
            options={[
              { key: "gap", label: "All" },
              { key: "gapX", label: "Left-Right" },
              { key: "gapY", label: "Top-Bottom" },
            ]}
          />
        </>
      )}

      {/* <BlockStyle type={"range"} label={"Columns"} property={"columns"} /> */}
      <BlockStyle type="advance" units={["-"]} label="Opacity" property="opacity" />
      <BlockStyle label="Visibility" property="visibility" />

      <BlockStyle label="Float" property="float" />
      <BlockStyle type="dropdown" label="Clear" property="clear" />
      <BlockStyle type="dropdown" label="Object Fit" property="objectFit" />
      <BlockStyle type="dropdown" label="Object Position" property="objectPosition" />
      <BlockStyle type="dropdown" label="Aspect Ratio" property="aspectRatio" />
      <MultipleChoices
        borderT
        type="range"
        borderB
        label="Overflow"
        options={[
          { key: "overflow", label: "All" },
          { key: "overflowX", label: "Left-Right" },
          { key: "overflowY", label: "Top-Bottom" },
        ]}
      />
      <MultipleChoices
        label="Overscroll"
        type="range"
        options={[
          { key: "overscroll", label: "All" },
          { key: "overscrollX", label: "Left-Right" },
          { key: "overscrollY", label: "Top-Bottom" },
        ]}
      />
    </>
  );
};
