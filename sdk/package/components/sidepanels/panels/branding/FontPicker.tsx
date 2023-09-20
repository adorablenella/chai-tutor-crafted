import * as React from "react";
import { CheckboxIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { FONTS } from "../../../../constants/FONTS";
import { Button, Popover, PopoverContent, PopoverTrigger, ScrollArea } from "../../../../radix-ui";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../../../../radix/components/ui/command";

const FontPicker = ({
  font,
  onSelect = () => {},
}: {
  font: string;
  onSelect: (newSelect: string) => void;
}): React.JSX.Element => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-36 h-6 justify-between text-xs capitalize whitespace-nowrap overflow-x-hidden px-3">
          <span className="whitespace-nowrap overflow-x-hidden">{font || "Select Font"}</span>
          <ChevronDownIcon className="h-3 w-3 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-max p-0 text-xs">
        <Command>
          <CommandInput placeholder="Search font..." />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            <ScrollArea className="max-h-80 text-xs overflow-y-auto">
              {FONTS.map((thisFont: string) => (
                <CommandItem
                  key={font}
                  onSelect={() => {
                    onSelect(thisFont);
                    setOpen(false);
                  }}>
                  <CheckboxIcon className={`mr-2 h-4 w-4 ${thisFont === font ? "opacity-100" : "opacity-0"}`} />
                  {thisFont}
                </CommandItem>
              ))}
            </ScrollArea>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default FontPicker;
