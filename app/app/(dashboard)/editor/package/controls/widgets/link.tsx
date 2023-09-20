import { WidgetProps } from "@rjsf/utils";

const LinkField = ({ value, onChange }: WidgetProps) => (
  <div className="flex items-center gap-x-2">
    <input
      type="checkbox"
      defaultChecked={value === "_blank"}
      className="border border-border rounded-md cursor-pointer"
      onChange={() => onChange(value === "_blank" ? "_self" : "_blank")}
    />
    <span className="text-xs pt-1">Open in new tab</span>
  </div>
);

export default LinkField;
