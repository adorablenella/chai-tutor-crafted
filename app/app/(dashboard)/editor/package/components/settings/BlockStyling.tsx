import { useAtom } from "jotai";
import { isEmpty } from "lodash";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import React from "react";
import { useTranslation } from "react-i18next";
import { useStylingState } from "../../hooks";
import { useSelectedBlocksDisplayChild } from "../../hooks/useSelectedBlockIds";
import { advanceStylingOpenAtom } from "../../store/ui";
import { FLEX_CHILD_SECTION, GRID_CHILD_SECTION, SETTINGS_SECTIONS } from "./new-panel/SECTIONS";
import { SettingsSection } from "./new-panel/SettingSection";
import {
  Accordion,
  Label,
  ScrollArea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../radix-ui";
import { useSelectedStylingBlocks } from "../../hooks/useSelectedStylingBlocks";

export default function BlockStyling() {
  const [state, setState] = useStylingState();
  const { flexChild, gridChild } = useSelectedBlocksDisplayChild();
  const [, setShowAdvance] = useAtom(advanceStylingOpenAtom);
  const { t } = useTranslation();

  const [stylingBlocks] = useSelectedStylingBlocks();
  if (isEmpty(stylingBlocks)) {
    return (
      <div className="p-4 text-center">
        <div className="space-y-4 rounded-xl p-4">
          <MixerHorizontalIcon className="mx-auto text-3xl" />
          <h1>{t("no_styling_block_selected")}</h1>
          <p className="text-xs ">
            Hint: Styling allowed blocks are highlighted with{" "}
            <span className="border border-orange-500 p-px">orange</span> border
          </p>
        </div>
      </div>
    );
  }

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div onClick={() => setShowAdvance(false)} className="flex flex-col h-full">
      <div className="flex flex-col space-x-4 space-y-3 border-b border-border px-4 py-2">
        <div className="flex items-center justify-end gap-x-1.5">
          <Label htmlFor="" className="flex text-xs italic gap-x-1.5">
            State
          </Label>
          <Select defaultValue={state as string} onValueChange={(value) => setState(value)}>
            <SelectTrigger className="w-fit p-1 px-3 h-auto">
              <SelectValue placeholder="State" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Normal</SelectItem>
              <SelectItem value="hover">Hover</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="focus">Focus</SelectItem>
              <SelectItem value="before">Before</SelectItem>
              <SelectItem value="after">After</SelectItem>
              <SelectItem value="only">Only</SelectItem>
              <SelectItem value="first">First</SelectItem>
              <SelectItem value="last">Last</SelectItem>
              <SelectItem value="first-letter">First Letter</SelectItem>
              <SelectItem value="first-line">First Line</SelectItem>
              <SelectItem value="disabled">Disabled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <ScrollArea className="h-full overflow-x-hidden no-scrollbar -mx-1">
        <Accordion type="multiple" className="w-full h-full">
          {flexChild && <SettingsSection section={FLEX_CHILD_SECTION} />}
          {gridChild ? <SettingsSection section={GRID_CHILD_SECTION} /> : null}
          {SETTINGS_SECTIONS.map((section) => (
            <SettingsSection key={section.heading} section={section} />
          ))}
        </Accordion>
      </ScrollArea>
    </div>
  );
}
