import { WidgetProps } from "@rjsf/utils";
import { GLOBAL_DATA_KEY } from "../../constants/CONTROLS";

const GlobalDataMapper = ({ value, onChange, id, onBlur }: WidgetProps) => (
  <div className="mt-1">
    <input
      type="text"
      className="w-full h-6"
      value={value.split(":").pop()}
      onBlur={({ target: { value: key } }) => onBlur(id, key)}
      onChange={({ target }) => onChange(`${GLOBAL_DATA_KEY}${value.split(":")[1]}:${target.value}`)}
    />
  </div>
);

export default GlobalDataMapper;
