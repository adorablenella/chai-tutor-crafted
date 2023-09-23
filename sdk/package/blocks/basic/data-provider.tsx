import * as React from "react";
import { registerInternalBlock } from "../../controls";
import { MultilineText, SingleLineText } from "../../controls/controls";

const DbIcon = () => (
  <svg
    data-v-f24af897=""
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide-icon customizable h-3 w-3">
    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
    <path d="M3 5V19A9 3 0 0 0 15 21.84"></path>
    <path d="M21 5V8"></path>
    <path d="M21 12L18 17H22L19 22"></path>
    <path d="M3 12A9 3 0 0 0 14.59 14.87"></path>
  </svg>
);

const DataProviderBlock = ({ children }: { children: React.ReactNode }) => children;

registerInternalBlock(DataProviderBlock, {
  type: "DataContext",
  label: "Data Context",
  category: "core",
  group: "basic",
  icon: DbIcon,
  props: {
    url: SingleLineText({ title: "URL", default: "" }),
    params: MultilineText({ title: "Params", default: "{}" }),
  },
});
