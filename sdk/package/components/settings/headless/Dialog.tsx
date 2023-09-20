import { get } from "lodash";
import { BlockNode } from "../../../functions/Layers";
import { useDynamicBlocks } from "../../../hooks/useDynamicBlocks";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Label, Switch } from "../../../radix-ui";

export const DialogSettings = ({ block }: { block: BlockNode }) => {
  const [state, setState] = useDynamicBlocks();
  const show = get(block, "id") === get(state, "Dialog");

  return (
    <Accordion type="multiple" className="w-full" defaultValue={["dialog-setting"]}>
      <AccordionItem value="dialog-setting">
        <AccordionTrigger className="pl-4 text-xs">Dialog Settings</AccordionTrigger>
        <AccordionContent className="px-4 py-2 bg-opacity-70">
          <span>Visibility</span>
          <div className="flex items-center space-x-3 pt-4">
            <Label htmlFor="airplane-mode">Hide</Label>

            <Switch
              checked={show}
              id="airplane-mode"
              onCheckedChange={(isOn) =>
                setState((states) => ({ ...states, Dialog: isOn ? get(block, "id", "") : "" }))
              }
            />
            <Label htmlFor="airplane-mode">Show</Label>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
