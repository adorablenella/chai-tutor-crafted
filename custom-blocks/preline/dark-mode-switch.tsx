import { DarkModeSwitch } from "@/custom-blocks/preline/client-components/DarkModeSwitch";
import { registerChaiBlock } from "@/sdk/next/server";

registerChaiBlock(DarkModeSwitch, {
  type: "DarkModeSwitch",
  label: "Dark Mode",
  category: "basic",
  group: "core",
});
