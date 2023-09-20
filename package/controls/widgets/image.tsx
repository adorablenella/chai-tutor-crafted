import { WidgetProps } from "@rjsf/utils";
import { isEmpty } from "lodash";
import ImagePickerModal from "../../components/sidepanels/panels/images/ImagePickerModal";

const ImagePickerField = ({ value, onChange, id, onBlur }: WidgetProps) => (
  <div className="flex items-center mt-1.5 gap-x-3">
    {value ? (
      <img src={value} className="w-20 h-20 object-cover border rounded-md overflow-hidden" alt="" />
    ) : (
      <ImagePickerModal onSelect={onChange}>
        <img
          src="https://placehold.co/100?text=Choose+Image&font=roboto"
          className="w-20 h-20 object-cover border rounded-md overflow-hidden cursor-pointer hover:border-blue-200"
          alt=""
        />
      </ImagePickerModal>
    )}
    <div className="flex flex-col w-3/5">
      <ImagePickerModal onSelect={onChange}>
        <small className="rounded-full px-2 py-1 bg-gray-600 dark:bg-gray-700 hover:bg-gray-500 text-white cursor-pointer text-xs text-center">
          {value || !isEmpty(value) ? "Replace Image" : "Choose Image"}
        </small>
      </ImagePickerModal>
      <small className="text-xs text-gray-600 pt-2 text-center -pl-4">OR</small>
      <input
        type="url"
        className="text-xs"
        placeholder="Enter image URL"
        value={value}
        onBlur={({ target: { value: url } }) => onBlur(id, url)}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  </div>
);
export default ImagePickerField;
