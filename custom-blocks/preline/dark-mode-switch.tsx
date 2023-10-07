"use client";

import { registerClientBlock } from "@/sdk/next/client";
import { DarkModeSwitch } from "@/custom-blocks/preline/DarkModeSwitch";

registerClientBlock(DarkModeSwitch, {
  type: "DarkModeSwitch",
  label: "Dark Mode",
  category: "basic",
  group: "core",
  props: {},
});
