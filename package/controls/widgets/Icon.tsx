import { WidgetProps } from "@rjsf/utils";
import IconPicker, { IconPickerItem } from "react-icons-picker";
import * as React from "react";
import ReactDOM from "react-dom";

const getSvgMarkup = (icon: string) => {
  const container = document.getElementById("icon-picker-field");
  const iconPickerContainer = document.createElement("div");
  ReactDOM.render(<IconPickerItem value={icon} />, iconPickerContainer);
  container.appendChild(iconPickerContainer);

  iconPickerContainer.hidden = true;
  const iconPickerMarkup = iconPickerContainer.innerHTML;

  setTimeout(() => container.removeChild(iconPickerContainer), 2000);

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
    <div className="h-20 mt-1 flex items-center gap-x-2" id="icon-picker-field">
      <div className="w-12 h-12 relative">
        <div
          dangerouslySetInnerHTML={{ __html: value?.replace("<svg", `<svg class="h-5 w-5"`) }}
          className="hover:hidden hover:h-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white cursor-pointer"
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
        className="h-full w-full rounded-lg text-xs bg-gray-200 outline-0 p-2"
        placeholder="Choose icon or enter svg"
      />
    </div>
  );
};

export default IconPickerField;
