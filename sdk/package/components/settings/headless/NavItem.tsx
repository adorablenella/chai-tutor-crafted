import { get } from "lodash";
import { BlockNode } from "../../../functions/Layers";
import { useDynamicBlocks } from "../../../hooks/useDynamicBlocks";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Label, Switch } from "../../../radix-ui";

export const NavItemSettings = ({ block }: { block: BlockNode }) => {
  const [state, setState] = useDynamicBlocks();
  const show = get(block, "id") === get(state, "NavLink");

  return (
    <Accordion type="multiple" className="w-full" defaultValue={["navlink-setting"]}>
      <AccordionItem value="navlink-setting">
        <AccordionTrigger className="pl-4 text-xs">NavLink Settings</AccordionTrigger>
        <AccordionContent className="px-4 py-2 bg-opacity-70">
          <span>Active?</span>
          <div className="flex items-center space-x-3 pt-4">
            <Label htmlFor="airplane-mode">No</Label>

            <Switch
              checked={show}
              id="airplane-mode"
              onCheckedChange={(isOn) =>
                setState((states) => ({ ...states, NavLink: isOn ? get(block, "id", "") : "" }))
              }
            />
            <Label htmlFor="airplane-mode">Yes</Label>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
