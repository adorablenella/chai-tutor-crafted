import { registerServerBlock } from "@/sdk/next/server";
import { Checkbox, Slot } from "@/sdk/package/controls/controls";
import { cn } from "@/sdk/package/radix/lib/utils";

const DropDown = ({ trigger, items, show, blockProps }: any) => {
  const id = "hs-dropdown-default";
  return (
    <div {...blockProps} className="hs-dropdown relative inline-flex">
      <button
        id={id}
        type="button"
        className="hs-dropdown-toggle inline-flex items-center justify-center gap-2 rounded-md border bg-white px-4 py-3 align-middle text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:hover:bg-slate-800 dark:hover:text-white dark:focus:ring-offset-gray-800">
        {trigger || "Dropdown"}
      </button>

      <div
        className={cn(
          "hs-dropdown-menu duration-[0.1ms] hs-dropdown-open:opacity-100 z-10 mt-2 hidden w-72 min-w-[15rem] rounded-lg bg-white p-2 opacity-0 shadow-md transition-[opacity,margin] dark:divide-gray-700 dark:border dark:border-gray-700 dark:bg-gray-800",
          show ? "block opacity-100" : "",
        )}
        aria-labelledby={id}>
        {items || (
          <a
            className="flex items-center gap-x-3.5 rounded-md px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
            href="#">
            Newsletter
          </a>
        )}
      </div>
    </div>
  );
};

registerServerBlock(DropDown, {
  type: "DropDown",
  label: "Drop Down",
  category: "core",
  group: "overlays",
  props: {
    show: Checkbox({ title: "Show/hide menu", defaultValue: false, builderProp: true }),
    hover: Checkbox({ title: "Trigger on hover?", defaultValue: false, builderProp: true }),
    trigger: Slot({ name: "Trigger", emptyStyles: "h-12" }),
    items: Slot({ name: "Items", emptyStyles: "h-40" }),
  },
});
