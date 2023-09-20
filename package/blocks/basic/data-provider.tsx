import * as React from "react";
import { registerInternalBlock } from "../../controls";
import { MultilineText, SingleLineText } from "../../controls/controls";

const DataProviderBlock = ({ children }: { children: React.ReactNode }) => children;

registerInternalBlock(DataProviderBlock, {
  type: "DataProvider",
  label: "Data Provider",
  category: "core",
  group: "basic",
  props: {
    name: SingleLineText({ title: "Name", default: "" }),
    params: MultilineText({ title: "Params", default: "{}" }),
  },
});
