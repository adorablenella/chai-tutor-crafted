import { WidgetProps } from "@rjsf/utils";
//@ts-ignore
import IconPicker, { IconPickerItem } from "react-icons-picker";
import * as React from "react";
import ReactDOM from "react-dom";

const getSvgMarkup = (icon: string) => {
  const container = document.getElementById("icon-picker-field") as HTMLElement;
  const iconPickerContainer = document.createElement("div");
  // eslint-disable-next-line react/no-deprecated
  ReactDOM.render(<IconPickerItem value={icon} />, iconPickerContainer);
  container.appendChild(iconPickerContainer);

  iconPickerContainer.hidden = true;
  const iconPickerMarkup = iconPickerContainer.innerHTML;

  setTimeout(() => container.removeChild(iconPickerContainer), 1000);

  return iconPickerMarkup;
};

const IconPickerField = ({ value, onChange, onBlur, id }: WidgetProps) => {
  const handleIconChange = (icon: string) => {
    onChange(`<svg />`);
    const svgMarkup = getSvgMarkup(icon);
    onChange(svgMarkup);
    onBlur(id, svgMarkup);
  };

  return (
    <div className="mt-1 flex h-20 items-center gap-x-2" id="icon-picker-field">
      <div className="relative h-12 w-12">
        <div
          dangerouslySetInnerHTML={{ __html: value?.replace("<svg", `<svg class="h-5 w-5"`) }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer bg-white hover:hidden hover:h-0"
        />
        <IconPicker
          value={value ? "BiSolidGrid" : null}
          onChange={handleIconChange}
          pickButtonStyle={{
            height: "48px",
            width: "48px",
            border: "1px solid #BBBBBB",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "6px",
          }}
          searchInputStyle={{
            backgroundColor: "transparent",
            width: "100%",
            border: "1px solid #BBBBBB",
            margin: "0px 10px",
            padding: "10px",
          }}
        />
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-full w-full rounded-sm border-foreground/20 px-2 py-1 text-xs shadow-sm focus:border-gray-500/80 focus:outline-none focus:ring-0"
        placeholder="Choose icon or enter svg"
      />
    </div>
  );
};

export default IconPickerField;
