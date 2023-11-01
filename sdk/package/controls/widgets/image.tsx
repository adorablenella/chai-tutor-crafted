import { WidgetProps } from "@rjsf/utils";
import { isEmpty } from "lodash";
import ImagePickerModal from "../../components/sidepanels/panels/images/ImagePickerModal";

const ImagePickerField = ({ value, onChange, id, onBlur }: WidgetProps) => (
  <div className="mt-1.5 flex items-center gap-x-3">
    {value ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={value} className="h-20 w-20 overflow-hidden rounded-md border object-cover" alt="" />
    ) : (
      <ImagePickerModal onSelect={onChange}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <div className="h-20 w-20 cursor-pointer rounded-md border bg-[radial-gradient(#AAA,transparent_1px)] duration-300 [background-size:10px_10px] hover:border-gray-400"></div>
      </ImagePickerModal>
    )}
    <div className="flex w-3/5 flex-col">
      <ImagePickerModal onSelect={onChange}>
        <small className="cursor-pointer rounded-full bg-gray-600 px-2 py-1 text-center text-xs text-white hover:bg-gray-500 dark:bg-gray-700">
          {value || !isEmpty(value) ? "Replace Image" : "Choose Image"}
        </small>
      </ImagePickerModal>
      <small className="-pl-4 pt-2 text-center text-xs text-gray-600">OR</small>
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
