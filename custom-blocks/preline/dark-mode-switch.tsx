import { DarkModeSwitch } from "@/custom-blocks/preline/client-components/DarkModeSwitch";
import { registerServerBlock } from "@/sdk/next/server";

registerServerBlock(DarkModeSwitch, {
  type: "DarkModeSwitch",
  label: "Dark Mode",
  category: "basic",
  group: "core",
  props: {},
});
