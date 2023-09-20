import * as React from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";
import { Popover, PopoverContent, PopoverTrigger } from "../../../../radix-ui";

type TColorPickerProps = {
  color: string;
  onColorChange: (newColor: string) => void;
};
const ColorPicker = ({ color = "", onColorChange = () => {} }: TColorPickerProps): React.JSX.Element => (
  <div className="flex items-center w-36">
    <HexColorInput
      className="flex w-[100px] rounded-md border border-border bg-background px-3 py-1 text-xs shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 h-6 z-20"
      color={color}
      onChange={onColorChange}
      prefixed
    />
    <Popover>
      <PopoverTrigger asChild className="w-10">
        <span
          className="h-6 w-11 rounded-r-md -mx-1 z-10 cursor-pointer border border-border"
          style={{ background: color }}
        />
      </PopoverTrigger>
      <PopoverContent className="w-max flex items-center justify-center">
        <HexColorPicker color={color} onChange={onColorChange} />
      </PopoverContent>
    </Popover>
  </div>
);

export default ColorPicker;
